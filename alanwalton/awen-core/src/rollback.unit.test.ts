import { describe, expect, test } from "bun:test"
import { decideRollback, type EntityFact, ROLLBACK_CONTINUITY_KEY, ROLLBACK_ENTITY_KEYS, ROLLBACK_STATE_KEYS, type RollbackFacts } from "./rollback"
import { classifyEntity, earliestRollbackableTurn, validateRollbackInput } from "./rollback-checks"

function baseFacts(overrides: Partial<RollbackFacts> = {}): RollbackFacts {
  const publishedAtNMs = 3_000
  return {
    gameId: "game-1",
    toTurn: 3,
    toTurnIsInteger: true,
    publishedAtNMs,
    latestPublishedTurn: 5,
    publishedTurnsMissingTurnNumber: [],
    oldestStateVersionMs: 500,
    repairedKeptTurnsAfterAnchor: [],
    state: { pageId: "state-1", pageTypeSlug: "game-state", versionId: "sv-3" },
    continuity: {
      gamePageId: "game-page-1",
      gamePageTypeSlug: "game",
      currentlyPresent: true,
      versionId: "cv-3",
      straddled: false,
      writtenInWindow: true,
    },
    entities: [
      {
        pageId: "ent-1",
        pageTypeSlug: "game-entity",
        externalId: "alan",
        createdAtMs: 100,
        versionId: "ev-3",
      },
    ],
    turns: [
      { pageId: "turn-1", turnNumber: 1, publishedAtMs: 1_000 },
      { pageId: "turn-2", turnNumber: 2, publishedAtMs: 2_000 },
      { pageId: "turn-3", turnNumber: 3, publishedAtMs: 3_000 },
      { pageId: "turn-4", turnNumber: 4, publishedAtMs: 4_000 },
      { pageId: "turn-5", turnNumber: 5, publishedAtMs: 5_000 },
    ],
    ...overrides,
  }
}

describe("classifyEntity", () => {
  test("a version at-or-before N → restore (existed at N)", () => {
    expect(
      classifyEntity({ createdAtMs: 100, publishedAtNMs: 3_000, hasAtOrBeforeVersion: true })
    ).toBe("restore")
  })

  test("no version and created after N → soft-delete (born after N)", () => {
    expect(
      classifyEntity({ createdAtMs: 4_500, publishedAtNMs: 3_000, hasAtOrBeforeVersion: false })
    ).toBe("soft-delete")
  })

  test("no version but created at-or-before N → refuse (impossible middle)", () => {
    expect(
      classifyEntity({ createdAtMs: 100, publishedAtNMs: 3_000, hasAtOrBeforeVersion: false })
    ).toBe("refuse")
  })
})

describe("validateRollbackInput", () => {
  test("clean input → no violations", () => {
    expect(
      validateRollbackInput({
        toTurn: 3,
        toTurnIsInteger: true,
        latestPublishedTurn: 5,
        publishedTurnsMissingTurnNumber: [],
      })
    ).toEqual([])
  })

  test("zero published turns → one violation (genuinely-empty cause unchanged)", () => {
    const v = validateRollbackInput({
      toTurn: 3,
      toTurnIsInteger: true,
      latestPublishedTurn: null,
      publishedTurnsMissingTurnNumber: [],
    })
    expect(v.length).toBe(1)
    expect(v[0]?.field).toBe("game")
    expect(v[0]?.message).toContain("no published turns")
  })

  test("published turns lack turnNumber, none stamped → the turnNumber refusal, NOT the false 'no published turns' (#14955)", () => {
    const v = validateRollbackInput({
      toTurn: 3,
      toTurnIsInteger: true,
      latestPublishedTurn: null,
      publishedTurnsMissingTurnNumber: ["turn-abc", "turn-def"],
    })
    expect(v.length).toBe(1)
    expect(v[0]?.field).toBe("game")
    expect(v[0]?.message).toContain("turn-abc")
    expect(v[0]?.message).toContain("turn-def")
    expect(v[0]?.message).toContain("turnNumber")
    expect(v[0]?.message).not.toContain("no published turns")
  })

  test("some published turns lack turnNumber (others stamped) → turnNumber refusal still fires", () => {
    const v = validateRollbackInput({
      toTurn: 3,
      toTurnIsInteger: true,
      latestPublishedTurn: 5,
      publishedTurnsMissingTurnNumber: ["turn-orphan"],
    })
    expect(v.some((x) => x.field === "game" && x.message.includes("turn-orphan"))).toBe(true)
    expect(v.every((x) => !x.message.includes("no published turns"))).toBe(true)
  })

  test("N at-or-past the latest published turn → violation", () => {
    expect(
      validateRollbackInput({
        toTurn: 5,
        toTurnIsInteger: true,
        latestPublishedTurn: 5,
        publishedTurnsMissingTurnNumber: [],
      }).length
    ).toBe(1)
    expect(
      validateRollbackInput({
        toTurn: 6,
        toTurnIsInteger: true,
        latestPublishedTurn: 5,
        publishedTurnsMissingTurnNumber: [],
      }).length
    ).toBe(1)
  })

  test("non-integer or non-positive N → violation, collected with others (all at once)", () => {
    const v = validateRollbackInput({
      toTurn: 0,
      toTurnIsInteger: false,
      latestPublishedTurn: null,
      publishedTurnsMissingTurnNumber: [],
    })
    expect(v.length).toBe(2)
  })
})

describe("earliestRollbackableTurn", () => {
  test("first turn published at-or-after the oldest state version, below the latest", () => {
    expect(
      earliestRollbackableTurn({
        oldestStateVersionMs: 2_500,
        latestPublishedTurn: 5,
        turns: [
          { turnNumber: 1, publishedAtMs: 1_000 },
          { turnNumber: 2, publishedAtMs: 2_000 },
          { turnNumber: 3, publishedAtMs: 3_000 },
          { turnNumber: 4, publishedAtMs: 4_000 },
        ],
      })
    ).toBe(3)
  })

  test("null when no game-state version exists", () => {
    expect(
      earliestRollbackableTurn({ oldestStateVersionMs: null, latestPublishedTurn: 5, turns: [] })
    ).toBeNull()
  })
})

describe("decideRollback — plan path", () => {
  test("clean facts → plan with state + continuity + entity restores and turns > N", () => {
    const decision = decideRollback(baseFacts())
    expect(decision.kind).toBe("plan")
    if (decision.kind !== "plan") throw new Error("expected plan")
    const { plan } = decision
    expect(plan.toTurn).toBe(3)
    const labels = plan.restores.map((r) => r.label)
    expect(labels).toContain("game-state")
    expect(labels).toContain("game.narrativeContinuity")
    expect(labels).toContain('game-entity "alan"')
    const stateRestore = plan.restores.find((r) => r.label === "game-state")
    expect(stateRestore?.keys).toEqual(ROLLBACK_STATE_KEYS)
    const contRestore = plan.restores.find((r) => r.label === "game.narrativeContinuity")
    expect(contRestore?.keys).toEqual([ROLLBACK_CONTINUITY_KEY])
    expect(contRestore?.branch).toBe("exact-direct")
    const entRestore = plan.restores.find((r) => r.label === 'game-entity "alan"')
    expect(entRestore?.keys).toEqual(ROLLBACK_ENTITY_KEYS)
    expect(plan.turnSoftDeletes.map((t) => t.turnNumber).sort()).toEqual([4, 5])
    expect(plan.entitySoftDeletes).toEqual([])
  })

  test("continuity absent now → not a restore, not a gap", () => {
    const decision = decideRollback(
      baseFacts({
        continuity: {
          gamePageId: "game-page-1",
          gamePageTypeSlug: "game",
          currentlyPresent: false,
          versionId: null,
          straddled: false,
          writtenInWindow: false,
        },
      })
    )
    expect(decision.kind).toBe("plan")
    if (decision.kind !== "plan") throw new Error("expected plan")
    expect(decision.plan.restores.some((r) => r.label === "game.narrativeContinuity")).toBe(false)
  })

  test("turn-only game (no game-state row) → no state restore, not a gap", () => {
    const decision = decideRollback(baseFacts({ state: null }))
    expect(decision.kind).toBe("plan")
    if (decision.kind !== "plan") throw new Error("expected plan")
    expect(decision.plan.restores.some((r) => r.label === "game-state")).toBe(false)
  })

  test("entity born after N → soft-deleted, not restored", () => {
    const existing: EntityFact = {
      pageId: "ent-1",
      pageTypeSlug: "game-entity",
      externalId: "alan",
      createdAtMs: 100,
      versionId: "ev-3",
    }
    const bornAfter: EntityFact = {
      pageId: "ent-2",
      pageTypeSlug: "game-entity",
      externalId: "newcomer",
      createdAtMs: 4_200,
      versionId: null,
    }
    const decision = decideRollback(baseFacts({ entities: [existing, bornAfter] }))
    expect(decision.kind).toBe("plan")
    if (decision.kind !== "plan") throw new Error("expected plan")
    expect(decision.plan.entitySoftDeletes).toEqual([{ pageId: "ent-2", externalId: "newcomer" }])
    expect(decision.plan.restores.some((r) => r.label === 'game-entity "newcomer"')).toBe(false)
  })
})

describe("decideRollback — refuse path (no silent partial restore)", () => {
  test("game-state missing its version → whole rollback refuses with earliest hint", () => {
    const decision = decideRollback(
      baseFacts({ state: { pageId: "state-1", pageTypeSlug: "game-state", versionId: null } })
    )
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") throw new Error("expected refuse")
    expect(decision.violations.some((v) => v.field === "game-state")).toBe(true)
    expect(decision.earliestRollbackableTurn).toBe(1)
  })

  test("continuity present-but-unrecoverable → refuse", () => {
    const decision = decideRollback(
      baseFacts({
        continuity: {
          gamePageId: "game-page-1",
          gamePageTypeSlug: "game",
          currentlyPresent: true,
          versionId: null,
          straddled: false,
          writtenInWindow: false,
        },
      })
    )
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") throw new Error("expected refuse")
    expect(decision.violations.some((v) => v.field === "game.narrativeContinuity")).toBe(true)
  })

  test("continuity helper returns AMBIGUOUS (straddling legacy row) → refuse loud, not a maybe-wrong restore", () => {
    const decision = decideRollback(
      baseFacts({
        continuity: {
          gamePageId: "game-page-1",
          gamePageTypeSlug: "game",
          currentlyPresent: true,
          versionId: null,
          straddled: true,
          writtenInWindow: false,
        },
      })
    )
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") throw new Error("expected refuse")
    const gap = decision.violations.find((v) => v.field === "game.narrativeContinuity")
    expect(gap).toBeDefined()
    expect(gap?.message).toContain("ambiguous")
  })

  test("in-window guard: continuity resolved but NOT written in turn N's window → refuse loud (#15092)", () => {
    const decision = decideRollback(
      baseFacts({
        continuity: {
          gamePageId: "game-page-1",
          gamePageTypeSlug: "game",
          currentlyPresent: true,
          versionId: "cv-2",
          straddled: false,
          writtenInWindow: false,
        },
      })
    )
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") throw new Error("expected refuse")
    const gap = decision.violations.find((v) => v.field === "game.narrativeContinuity")
    expect(gap).toBeDefined()
    expect(gap?.message).toContain("window")
  })

  test("repair-event guard: a KEPT turn repaired after the continuity anchor → refuse loud naming it (#15092)", () => {
    const decision = decideRollback(baseFacts({ repairedKeptTurnsAfterAnchor: ["turn-2"] }))
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") throw new Error("expected refuse")
    const gap = decision.violations.find((v) => v.field === "game.narrativeContinuity")
    expect(gap).toBeDefined()
    expect(gap?.message).toContain("turn-2")
    expect(gap?.message).toContain("repair")
  })

  test("impossible-middle entity (existed at N, no version) → refuse, not soft-delete", () => {
    const impossible: EntityFact = {
      pageId: "ent-3",
      pageTypeSlug: "game-entity",
      externalId: "ghost",
      createdAtMs: 100,
      versionId: null,
    }
    const decision = decideRollback(baseFacts({ entities: [impossible] }))
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") throw new Error("expected refuse")
    expect(decision.violations.some((v) => v.field === 'game-entity "ghost"')).toBe(true)
  })

  test("turnNumber-less published turns → decideRollback refuses naming the turns, not 'no published turns' (#14955)", () => {
    const decision = decideRollback(
      baseFacts({
        latestPublishedTurn: null,
        publishedTurnsMissingTurnNumber: ["turn-xyz"],
      })
    )
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") throw new Error("expected refuse")
    const gap = decision.violations.find((v) => v.field === "game")
    expect(gap?.message).toContain("turn-xyz")
    expect(gap?.message).toContain("turnNumber")
    expect(gap?.message).not.toContain("no published turns")
  })

  test("input violation short-circuits before gap analysis", () => {
    const decision = decideRollback(baseFacts({ toTurn: 5, latestPublishedTurn: 5 }))
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") throw new Error("expected refuse")
    expect(decision.violations.every((v) => v.field === "--to-turn")).toBe(true)
  })
})
