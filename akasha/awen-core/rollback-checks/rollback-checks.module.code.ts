import type { GameConfigViolation } from "../game-config-schema/game-config-schema.module.code.ts"

export type EntityDisposition = "restore" | "delete" | "refuse"

export function classifyEntity(input: {
  readonly createdAtMs: number
  readonly publishedAtNMs: number
  readonly hasAtOrBeforeVersion: boolean
}): EntityDisposition {
  if (input.hasAtOrBeforeVersion) return "restore"
  if (input.createdAtMs > input.publishedAtNMs) return "delete"
  return "refuse"
}

export function validateRollbackInput(input: {
  readonly toTurn: number
  readonly toTurnIsInteger: boolean
  readonly latestPublishedTurn: number | null
  readonly publishedTurnsMissingTurnNumber: readonly string[]
}): readonly GameConfigViolation[] {
  const violations: GameConfigViolation[] = []
  if (!input.toTurnIsInteger || input.toTurn < 1) {
    violations.push({
      field: "--to-turn",
      message: `must be a positive integer turn number (got ${String(input.toTurn)})`,
    })
  }
  if (input.publishedTurnsMissingTurnNumber.length > 0) {
    const named = input.publishedTurnsMissingTurnNumber.map((id) => `"${id}"`).join(", ")
    violations.push({
      field: "game",
      message: `published turn(s) ${named} lack a turnNumber attribute and cannot anchor a rollback; stamp turnNumber (via a commit-turn upsert) before rolling back`,
    })
  } else if (input.latestPublishedTurn === null) {
    violations.push({
      field: "game",
      message: "game has no published turns; nothing to roll back",
    })
  }
  if (
    input.latestPublishedTurn !== null &&
    input.toTurnIsInteger &&
    input.toTurn >= input.latestPublishedTurn
  ) {
    violations.push({
      field: "--to-turn",
      message: `must be < the latest published turn (${input.latestPublishedTurn}); nothing to roll back to a turn at-or-past the latest`,
    })
  }
  return violations
}

export function earliestRollbackableTurn(input: {
  readonly oldestStateVersionMs: number | null
  readonly latestPublishedTurn: number | null
  readonly turns: readonly { readonly turnNumber: number; readonly publishedAtMs: number | null }[]
}): number | null {
  const { oldestStateVersionMs, latestPublishedTurn } = input
  if (oldestStateVersionMs === null || latestPublishedTurn === null) return null
  let earliest: number | null = null
  for (const turn of input.turns) {
    if (turn.publishedAtMs === null) continue
    if (turn.publishedAtMs < oldestStateVersionMs) continue
    if (turn.turnNumber >= latestPublishedTurn) continue
    if (earliest === null || turn.turnNumber < earliest) earliest = turn.turnNumber
  }
  return earliest
}
