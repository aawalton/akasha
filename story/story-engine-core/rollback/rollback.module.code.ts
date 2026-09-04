import type { GameConfigViolation } from "../game-config-schema/game-config-schema.module.code.ts"
import {
  classifyEntity,
  earliestRollbackableTurn,
  validateRollbackInput,
} from "../rollback-checks/rollback-checks.module.code.ts"

export const ROLLBACK_STATE_KEYS = [
  "turn",
  "hud",
  "revealed",
  "build",
  "log",
  "chapters",
  "sourceState",
  "sourceShape",
  "revealedAt",
] as const

export const ROLLBACK_ENTITY_KEYS = ["kind", "level", "sheet", "title", "revealGate"] as const

export const ROLLBACK_CONTINUITY_KEY = "narrativeContinuity"

export type ContinuityBranch = "exact-direct"

export interface RollbackRestore {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly label: string
  readonly versionId: string
  readonly keys: readonly string[]
  readonly branch?: ContinuityBranch
}

export interface RollbackDeleteEntity {
  readonly pageId: string
  readonly externalId: string
}

export interface RollbackDeleteTurn {
  readonly pageId: string
  readonly turnNumber: number
}

export interface RollbackPlan {
  readonly gameId: string
  readonly toTurn: number
  readonly restores: readonly RollbackRestore[]
  readonly entityDeletes: readonly RollbackDeleteEntity[]
  readonly turnDeletes: readonly RollbackDeleteTurn[]
}

export type RollbackDecision =
  | {
      readonly kind: "refuse"
      readonly violations: readonly GameConfigViolation[]
      readonly earliestRollbackableTurn: number | null
    }
  | { readonly kind: "plan"; readonly plan: RollbackPlan }

export interface StateFact {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly versionId: string | null
}

export interface ContinuityFact {
  readonly gamePageId: string
  readonly gamePageTypeSlug: string
  readonly currentlyPresent: boolean
  readonly versionId: string | null
  readonly straddled: boolean
  readonly writtenInWindow: boolean
}

export interface EntityFact {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly externalId: string
  readonly createdAtMs: number
  readonly versionId: string | null
}

export interface TurnFact {
  readonly pageId: string
  readonly turnNumber: number
  readonly publishedAtMs: number | null
}

export interface RollbackFacts {
  readonly gameId: string
  readonly toTurn: number
  readonly toTurnIsInteger: boolean
  readonly publishedAtNMs: number
  readonly latestPublishedTurn: number | null
  readonly publishedTurnsMissingTurnNumber: readonly string[]
  readonly oldestStateVersionMs: number | null
  readonly repairedKeptTurnsAfterAnchor: readonly string[]
  readonly state: StateFact | null
  readonly continuity: ContinuityFact
  readonly entities: readonly EntityFact[]
  readonly turns: readonly TurnFact[]
}

export function decideRollback(facts: RollbackFacts): RollbackDecision {
  const inputViolations = validateRollbackInput({
    toTurn: facts.toTurn,
    toTurnIsInteger: facts.toTurnIsInteger,
    latestPublishedTurn: facts.latestPublishedTurn,
    publishedTurnsMissingTurnNumber: facts.publishedTurnsMissingTurnNumber,
  })
  if (inputViolations.length > 0) {
    return { kind: "refuse", violations: inputViolations, earliestRollbackableTurn: null }
  }

  const gaps: GameConfigViolation[] = []
  const restores: RollbackRestore[] = []
  const entityDeletes: RollbackDeleteEntity[] = []

  if (facts.state !== null) {
    if (facts.state.versionId === null) {
      gaps.push({
        field: "game-state",
        message:
          "no game-state version at-or-before turn N's publish stamp (turn N predates game-state versioning, or the value was elided)",
      })
    } else {
      restores.push({
        pageId: facts.state.pageId,
        pageTypeSlug: facts.state.pageTypeSlug,
        label: "game-state",
        versionId: facts.state.versionId,
        keys: ROLLBACK_STATE_KEYS,
      })
    }
  }

  if (facts.continuity.currentlyPresent) {
    if (facts.continuity.straddled) {
      gaps.push({
        field: "game.narrativeContinuity",
        message:
          "the version row covering turn N is a pre-stamp legacy row that collapsed a later same-day write into it (disjoint-key merge advanced its tail past N), so its exact revision at turn N is ambiguous — refusing rather than restore a maybe-wrong narrativeContinuity (post-#14954 writes carry per-key stamps and restore exact)",
      })
    } else if (facts.continuity.versionId === null) {
      gaps.push({
        field: "game.narrativeContinuity",
        message:
          "narrativeContinuity is set now but has no version at-or-before the rollback's continuity anchor (the earliest-deleted published turn's stamp) — it was introduced after turn N",
      })
    } else if (!facts.continuity.writtenInWindow) {
      gaps.push({
        field: "game.narrativeContinuity",
        message:
          "no narrativeContinuity write landed in turn N's window (after turn N's publish stamp, at-or-before the next published turn's) — turn N's update-continuity obligation appears unmet, so anchoring would restore turn N-1's canon; refusing rather than silently mis-anchor",
      })
    } else {
      restores.push({
        pageId: facts.continuity.gamePageId,
        pageTypeSlug: facts.continuity.gamePageTypeSlug,
        label: "game.narrativeContinuity",
        versionId: facts.continuity.versionId,
        keys: [ROLLBACK_CONTINUITY_KEY],
        branch: "exact-direct",
      })
    }
  }

  if (facts.repairedKeptTurnsAfterAnchor.length > 0) {
    const named = facts.repairedKeptTurnsAfterAnchor.map((id) => `"${id}"`).join(", ")
    gaps.push({
      field: "game.narrativeContinuity",
      message: `kept turn(s) ${named} were repaired (repair-turn) after this rollback's continuity anchor, so their repaired canon is stamped past the anchor and would be silently dropped — refusing. Re-apply the repair after the rollback if still wanted.`,
    })
  }

  for (const entity of facts.entities) {
    const disposition = classifyEntity({
      createdAtMs: entity.createdAtMs,
      publishedAtNMs: facts.publishedAtNMs,
      hasAtOrBeforeVersion: entity.versionId !== null,
    })
    if (disposition === "restore" && entity.versionId !== null) {
      restores.push({
        pageId: entity.pageId,
        pageTypeSlug: entity.pageTypeSlug,
        label: `game-entity "${entity.externalId}"`,
        versionId: entity.versionId,
        keys: ROLLBACK_ENTITY_KEYS,
      })
    } else if (disposition === "delete") {
      entityDeletes.push({ pageId: entity.pageId, externalId: entity.externalId })
    } else {
      gaps.push({
        field: `game-entity "${entity.externalId}"`,
        message:
          "existed at-or-before turn N (created_at) but has no version at-or-before its publish stamp — the version store disagrees with created_at; investigate, do not roll back",
      })
    }
  }

  if (gaps.length > 0) {
    return {
      kind: "refuse",
      violations: gaps,
      earliestRollbackableTurn: earliestRollbackableTurn({
        oldestStateVersionMs: facts.oldestStateVersionMs,
        latestPublishedTurn: facts.latestPublishedTurn,
        turns: facts.turns,
      }),
    }
  }

  const turnDeletes: RollbackDeleteTurn[] = facts.turns
    .filter((turn) => turn.turnNumber > facts.toTurn)
    .map((turn) => ({ pageId: turn.pageId, turnNumber: turn.turnNumber }))

  return {
    kind: "plan",
    plan: {
      gameId: facts.gameId,
      toTurn: facts.toTurn,
      restores,
      entityDeletes,
      turnDeletes,
    },
  }
}
