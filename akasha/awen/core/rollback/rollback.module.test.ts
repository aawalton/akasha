import { describe, expect, test } from "bun:test"
import type { RollbackFacts } from "./rollback.module.code.ts"
import { decideRollback, ROLLBACK_STATE_KEYS } from "./rollback.module.code.ts"

const facts = (over: Partial<RollbackFacts> = {}): RollbackFacts => ({
  gameId: "game-1",
  toTurn: 3,
  toTurnIsInteger: true,
  publishedAtNMs: 300,
  latestPublishedTurn: 5,
  publishedTurnsMissingTurnNumber: [],
  oldestStateVersionMs: 100,
  repairedKeptTurnsAfterAnchor: [],
  state: { pageId: "state-1", pageTypeSlug: "game-state", versionId: "v-state" },
  continuity: {
    gamePageId: "game-page",
    gamePageTypeSlug: "game",
    currentlyPresent: false,
    versionId: null,
    straddled: false,
    writtenInWindow: false,
  },
  entities: [],
  turns: [
    { pageId: "t1", turnNumber: 1, publishedAtMs: 100 },
    { pageId: "t2", turnNumber: 2, publishedAtMs: 200 },
    { pageId: "t3", turnNumber: 3, publishedAtMs: 300 },
    { pageId: "t4", turnNumber: 4, publishedAtMs: 400 },
    { pageId: "t5", turnNumber: 5, publishedAtMs: 500 },
  ],
  ...over,
})

describe("decideRollback", () => {
  test("a sound request yields a plan restoring the game state", () => {
    const decision = decideRollback(facts())
    expect(decision.kind).toBe("plan")
    if (decision.kind !== "plan") return
    expect(decision.plan.gameId).toBe("game-1")
    expect(decision.plan.toTurn).toBe(3)
    expect(decision.plan.restores).toHaveLength(1)
    expect(decision.plan.restores[0]?.label).toBe("game-state")
    expect(decision.plan.restores[0]?.keys).toEqual(ROLLBACK_STATE_KEYS)
  })

  test("turns past the target are deleted", () => {
    const decision = decideRollback(facts())
    if (decision.kind !== "plan") throw new Error("expected a plan")
    expect(decision.plan.turnDeletes.map((t) => t.turnNumber)).toEqual([4, 5])
  })

  test("an unsound request is refused before anything else is weighed", () => {
    const decision = decideRollback(facts({ toTurn: 5 }))
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") return
    expect(decision.earliestRollbackableTurn).toBe(null)
  })

  test("a game state with no version at-or-before the anchor is refused", () => {
    const decision = decideRollback(
      facts({ state: { pageId: "state-1", pageTypeSlug: "game-state", versionId: null } })
    )
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") return
    expect(decision.violations.map((v) => v.field)).toEqual(["game-state"])
    expect(decision.earliestRollbackableTurn).toBe(1)
  })

  test("an entity made after the anchor is deleted rather than restored", () => {
    const decision = decideRollback(
      facts({
        entities: [
          {
            pageId: "e1",
            pageTypeSlug: "game-entity",
            externalId: "goblin",
            createdAtMs: 450,
            versionId: null,
          },
        ],
      })
    )
    if (decision.kind !== "plan") throw new Error("expected a plan")
    expect(decision.plan.entityDeletes).toEqual([{ pageId: "e1", externalId: "goblin" }])
  })

  test("an entity older than the anchor with no version refuses the whole rollback", () => {
    const decision = decideRollback(
      facts({
        entities: [
          {
            pageId: "e1",
            pageTypeSlug: "game-entity",
            externalId: "goblin",
            createdAtMs: 50,
            versionId: null,
          },
        ],
      })
    )
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") return
    expect(decision.violations[0]?.field).toBe('game-entity "goblin"')
  })

  test("continuity present with an exact version is restored on its own branch", () => {
    const decision = decideRollback(
      facts({
        continuity: {
          gamePageId: "game-page",
          gamePageTypeSlug: "game",
          currentlyPresent: true,
          versionId: "v-cont",
          straddled: false,
          writtenInWindow: true,
        },
      })
    )
    if (decision.kind !== "plan") throw new Error("expected a plan")
    const continuity = decision.plan.restores.find((r) => r.label === "game.narrativeContinuity")
    expect(continuity?.branch).toBe("exact-direct")
    expect(continuity?.keys).toEqual(["narrativeContinuity"])
  })

  test("a straddled continuity row is refused rather than guessed at", () => {
    const decision = decideRollback(
      facts({
        continuity: {
          gamePageId: "game-page",
          gamePageTypeSlug: "game",
          currentlyPresent: true,
          versionId: "v-cont",
          straddled: true,
          writtenInWindow: true,
        },
      })
    )
    expect(decision.kind).toBe("refuse")
  })

  test("continuity never written in the turn's window is refused", () => {
    const decision = decideRollback(
      facts({
        continuity: {
          gamePageId: "game-page",
          gamePageTypeSlug: "game",
          currentlyPresent: true,
          versionId: "v-cont",
          straddled: false,
          writtenInWindow: false,
        },
      })
    )
    expect(decision.kind).toBe("refuse")
  })

  test("a kept turn repaired after the anchor refuses the rollback", () => {
    const decision = decideRollback(facts({ repairedKeptTurnsAfterAnchor: ["turn-2"] }))
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") return
    expect(decision.violations[0]?.message).toContain("turn-2")
  })

  test("a game with no state page restores nothing and still plans", () => {
    const decision = decideRollback(facts({ state: null }))
    if (decision.kind !== "plan") throw new Error("expected a plan")
    expect(decision.plan.restores).toEqual([])
  })
})
