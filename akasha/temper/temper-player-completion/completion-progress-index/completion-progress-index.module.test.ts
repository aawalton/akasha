import { describe, expect, test } from "bun:test"
import {
  buildAccountCompletionIndex,
  buildCharacterCompletionIndex,
  buildCrossCharacterCompletionIndex,
  materializeCrossCharacterProgress,
} from "./completion-progress-index.module.code.ts"
import {
  CHAR_EMPTY,
  CHAR_FULL,
  CHAR_MORPHS,
  CHAR_PARTIAL,
  CHAR_SKILL_POINTS,
  EMPTY_ACCOUNT,
  mkRosterEntry,
} from "./completion-progress-index.module.test-fixtures.ts"

describe("buildCharacterCompletionIndex", () => {
  test("emits the cardId-only key for a flat card with no picker (daily-writs)", () => {
    const index = buildCharacterCompletionIndex("c0", {})
    expect(index["daily-writs"]).toEqual({ current: 0, total: 7 })
    expect(index["daily-writs/speed"]).toBeUndefined()
  })

  test("emits depth-0 plus per-stat keys for a 1-deep narrowed card (mount-training)", () => {
    const index = buildCharacterCompletionIndex("c0", CHAR_PARTIAL)
    expect(index["mount-training"]).toEqual({ current: 30, total: 180 })
    expect(index["mount-training/speed"]).toEqual({ current: 30, total: 60 })
    expect(index["mount-training/stamina"]).toEqual({ current: 0, total: 60 })
    expect(index["mount-training/carryCapacity"]).toEqual({ current: 0, total: 60 })
  })

  test("skips paths whose resolver returns undefined (no mountTraining data)", () => {
    const index = buildCharacterCompletionIndex("c0", {})
    expect(index["mount-training"]).toBeUndefined()
    expect(index["mount-training/speed"]).toBeUndefined()
  })

  test("does not include account-scoped cards in the character index", () => {
    const index = buildCharacterCompletionIndex("c0", CHAR_FULL)
    expect(index["account-achievements"]).toBeUndefined()
  })

  test("emits a skill-morphs key for a character with class, race and skill data", () => {
    const index = buildCharacterCompletionIndex("c1", CHAR_MORPHS)
    const entry = index["skill-morphs"]
    expect(entry).toBeDefined()
    if (!entry) throw new Error("skill-morphs missing")
    expect(entry.total).toBeGreaterThan(0)
    expect(entry.current).toBe(0)
  })

  test("materializes the Folium Discognitum leaf as x/y", () => {
    const index = buildCharacterCompletionIndex("c0", CHAR_SKILL_POINTS)
    expect(index["skill-points/general/foliumDiscognitum"]).toEqual({ current: 2, total: 2 })
  })

  test("materializes the general branch and card-level rollups", () => {
    const index = buildCharacterCompletionIndex("c0", CHAR_SKILL_POINTS)
    expect(index["skill-points/general"]).toBeDefined()
    expect(index["skill-points"]).toBeDefined()
  })
})

describe("buildAccountCompletionIndex", () => {
  test("does not include character-scoped cards in the account index", () => {
    const index = buildAccountCompletionIndex(EMPTY_ACCOUNT)
    expect(index["mount-training"]).toBeUndefined()
    expect(index["daily-writs"]).toBeUndefined()
  })
})

describe("buildCrossCharacterCompletionIndex", () => {
  test("returns the container with one characters entry per roster character", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_EMPTY),
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
    ]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(Object.keys(index.characters).sort()).toEqual(["c1", "c2"])
    expect(index.characters.c1).toEqual({ label: "Alpha", sortOrder: 1 })
    expect(index.characters.c2).toEqual({ label: "Beta", sortOrder: 2 })
  })

  test("returns an empty container for an empty roster", () => {
    expect(buildCrossCharacterCompletionIndex([], EMPTY_ACCOUNT)).toEqual({
      characters: {},
      paths: {},
    })
  })

  test("rolls up and names the first incomplete by sort order as effective", () => {
    const roster = [
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
      mkRosterEntry("c1", "Alpha", 1, CHAR_EMPTY),
      mkRosterEntry("c3", "Gamma", 3, CHAR_EMPTY),
    ]
    const entry = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT).paths["mount-training"]
    if (!entry) throw new Error("mount-training missing")
    expect(entry.current).toBe(0)
    expect(entry.total).toBe(540)
    expect(entry.effectiveCharacterId).toBe("c1")
    expect(Object.keys(entry.entries).sort()).toEqual(["c1", "c2", "c3"])
  })

  test("stores numbers-only per-character entries", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL),
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
    ]
    const entry = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT).paths["mount-training"]
    if (!entry) throw new Error("mount-training missing")
    expect(entry.entries.c1).toEqual({ current: 30, total: 180 })
    expect(entry.entries.c2).toEqual({ current: 0, total: 180 })
  })

  test("names no effective character when every character is finished", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_FULL),
      mkRosterEntry("c2", "Beta", 2, CHAR_FULL),
    ]
    const entry = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT).paths["mount-training"]
    if (!entry) throw new Error("mount-training missing")
    expect(entry.effectiveCharacterId).toBeUndefined()
    expect(entry.current).toBe(entry.total)
    for (const child of Object.values(entry.entries)) expect(child.current).toBe(child.total)
  })

  test("names the first incomplete as effective in mixed completion", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_FULL),
      mkRosterEntry("c2", "Beta", 2, CHAR_PARTIAL),
      mkRosterEntry("c3", "Gamma", 3, CHAR_EMPTY),
    ]
    const entry = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT).paths["mount-training"]
    if (!entry) throw new Error("mount-training missing")
    expect(entry.effectiveCharacterId).toBe("c2")
    expect(entry.current).toBe(180 + 30 + 0)
    expect(entry.total).toBe(540)
  })

  test("stores null sortOrder as the largest safe integer and sorts it last", () => {
    const roster = [
      mkRosterEntry("c-null", "ZZZ", null, CHAR_EMPTY),
      mkRosterEntry("c1", "Alpha", 1, CHAR_FULL),
    ]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(index.characters["c-null"]?.sortOrder).toBe(Number.MAX_SAFE_INTEGER)
    expect(index.paths["mount-training"]?.effectiveCharacterId).toBe("c-null")
  })

  test("uses firstName as the characters-map label, falling back to name", () => {
    const roster = [
      { id: "c1", name: "Alpha Full", firstName: "Alpha", sortOrder: 1, completion: CHAR_EMPTY },
      { id: "c2", name: "Beta Full", firstName: "", sortOrder: 2, completion: CHAR_EMPTY },
    ]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(index.characters.c1?.label).toBe("Alpha")
    expect(index.characters.c2?.label).toBe("Beta Full")
  })

  test("drops a path where every character resolves to undefined", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, {}), mkRosterEntry("c2", "Beta", 2, {})]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(index.paths["mount-training"]).toBeUndefined()
    expect(index.paths["mount-training/speed"]).toBeUndefined()
    expect(Object.keys(index.characters).sort()).toEqual(["c1", "c2"])
  })

  test("emits a skill-morphs path for a roster entry with class, race and skill data", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, CHAR_MORPHS)]
    const entry = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT).paths["skill-morphs"]
    if (!entry) throw new Error("skill-morphs missing")
    expect(entry.total).toBeGreaterThan(0)
    expect(entry.entries.c1?.total).toBe(entry.total)
  })
})

describe("materializeCrossCharacterProgress", () => {
  test("reads a built index back as the roster total and its per-character rows", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL),
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
    ]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(materializeCrossCharacterProgress(index, "mount-training")).toEqual({
      progressCurrent: 30,
      progressTotal: 360,
      effectiveCharacterId: "c1",
      rows: [
        { characterName: "Alpha", progressCurrent: 30, progressTotal: 180, displayOrder: 1 },
        { characterName: "Beta", progressCurrent: 0, progressTotal: 180, displayOrder: 2 },
      ],
    })
  })

  test("carries the roster total rather than the effective character's own pair", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL),
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
    ]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const reading = materializeCrossCharacterProgress(index, "mount-training")
    if (reading === null) throw new Error("mount-training missing")
    expect(reading.progressTotal).toBe(360)
    expect(reading.rows.find((row) => row.characterName === "Alpha")?.progressTotal).toBe(180)
  })

  test("reads a sub-path key", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL)]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const reading = materializeCrossCharacterProgress(index, "mount-training/speed")
    if (reading === null) throw new Error("mount-training/speed missing")
    expect(reading.rows[0]?.progressCurrent).toBe(30)
    expect(reading.rows[0]?.progressTotal).toBe(60)
  })

  test("names no effective character when the slim entry names none", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, CHAR_FULL)]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const reading = materializeCrossCharacterProgress(index, "mount-training")
    if (reading === null) throw new Error("mount-training missing")
    expect(reading.effectiveCharacterId).toBeUndefined()
  })

  test("returns null when the pathKey is absent", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL)]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(materializeCrossCharacterProgress(index, "no-such-card")).toBeNull()
  })

  test("returns null for the old flat-shaped stored index", () => {
    const legacyFlat: unknown = {
      "mount-training": { current: 30, total: 180, entries: { c1: { current: 30, total: 180 } } },
    }
    expect(materializeCrossCharacterProgress(legacyFlat, "mount-training")).toBeNull()
  })

  test("returns null for non-container inputs", () => {
    expect(materializeCrossCharacterProgress(null, "mount-training")).toBeNull()
    expect(materializeCrossCharacterProgress(undefined, "mount-training")).toBeNull()
    expect(materializeCrossCharacterProgress("nope", "mount-training")).toBeNull()
    expect(materializeCrossCharacterProgress(42, "mount-training")).toBeNull()
  })

  test("falls back when a character is missing from the characters map", () => {
    const container: unknown = {
      characters: {},
      paths: {
        "mount-training": { current: 1, total: 2, entries: { ghost: { current: 1, total: 2 } } },
      },
    }
    const reading = materializeCrossCharacterProgress(container, "mount-training")
    if (reading === null) throw new Error("mount-training missing")
    const ghost = reading.rows[0]
    if (!ghost) throw new Error("ghost row missing")
    expect(ghost.characterName).toBe("ghost")
    expect(ghost.progressCurrent).toBe(1)
    expect(ghost.progressTotal).toBe(2)
    expect(ghost.displayOrder).toBe(Number.MAX_SAFE_INTEGER)
  })

  test("carries no link on a row", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL)]
    const index = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const reading = materializeCrossCharacterProgress(index, "mount-training")
    if (reading === null) throw new Error("mount-training missing")
    expect(Object.keys(reading.rows[0] ?? {}).sort()).toEqual([
      "characterName",
      "displayOrder",
      "progressCurrent",
      "progressTotal",
    ])
  })
})
