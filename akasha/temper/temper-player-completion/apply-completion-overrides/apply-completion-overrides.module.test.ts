import { describe, expect, test } from "bun:test"
import type {
  CharacterCompletion,
  SkillPointProgress,
} from "@akasha/temper-completion/completion-progress"
import type { CompletionOverride } from "../completion-override/completion-override.module.code.ts"
import { applyCompletionOverrides } from "./apply-completion-overrides.module.code.ts"

function emptySkillPoints(): SkillPointProgress {
  return {
    total: 0,
    unassigned: 0,
    level: 0,
    mainQuests: 0,
    tutorial: 0,
    foliumDiscognitum: 0,
    pvpRank: 0,
    maelstromArena: 0,
    endlessArchive: 0,
    skyshardPoints: 0,
    totalSkyshards: 0,
    zoneQuestTotal: 0,
    groupDungeonTotal: 0,
    publicDungeonTotal: 0,
    skyshards: {},
    zoneQuests: {},
    groupDungeons: {},
    publicDungeons: {},
  }
}

function override(
  itemPath: readonly (string | number)[],
  atLeast: number,
  cardId: CompletionOverride["completionCardId"] = "skill-points"
): CompletionOverride {
  return { completionCardId: cardId, completionItemPath: itemPath, floor: atLeast }
}

describe("applyCompletionOverrides over the skill-points general branch", () => {
  test("raises foliumDiscognitum from 0 to 2, the Erin Solstice case", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
    ])
    expect(result.skillPoints?.foliumDiscognitum).toBe(2)
  })

  test("does not lower a value already above what the override asks", () => {
    const skillPoints = emptySkillPoints()
    skillPoints.level = 50
    const completion: CharacterCompletion = { skillPoints }
    const result = applyCompletionOverrides(completion, [override(["general", "level"], 10)])
    expect(result.skillPoints?.level).toBe(50)
  })

  test("clamps what the override asks to the source's static max", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 99),
    ])
    expect(result.skillPoints?.foliumDiscognitum).toBe(2)
  })

  test("is idempotent, so applying twice equals applying once", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const once = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
    ])
    const twice = applyCompletionOverrides(once, [override(["general", "foliumDiscognitum"], 2)])
    expect(twice).toEqual(once)
  })

  test("returns the input reference unchanged when the override is a no-op", () => {
    const skillPoints = emptySkillPoints()
    skillPoints.foliumDiscognitum = 2
    const completion: CharacterCompletion = { skillPoints }
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
    ])
    expect(result).toBe(completion)
  })

  test("does not mutate the input blob", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    applyCompletionOverrides(completion, [override(["general", "foliumDiscognitum"], 2)])
    expect(completion.skillPoints?.foliumDiscognitum).toBe(0)
  })

  test("synthesizes skillPoints when the blob has none", () => {
    const completion: CharacterCompletion = {}
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
    ])
    expect(result.skillPoints?.foliumDiscognitum).toBe(2)
  })

  test("ignores an unknown general key", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["general", "notAThing"], 5)])
    expect(result).toBe(completion)
  })
})

describe("applyCompletionOverrides over the skill-points nested branches", () => {
  test("raises a skyshards zone entry, clamped to maxSkyshards", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["skyshards", "AD1"], 99)])
    expect(result.skillPoints?.skyshards.AD1).toBe(16)
  })

  test("raises a zoneQuests entry, clamped to maxQuests", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["zoneQuests", "AD1"], 99)])
    expect(result.skillPoints?.zoneQuests.AD1).toBe(3)
  })

  test("raises a groupDungeons entry to binary 1", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["groupDungeons", "BC1"], 5)])
    expect(result.skillPoints?.groupDungeons.BC1).toBe(1)
  })

  test("ignores an unknown zone key", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["skyshards", "NOPE"], 1)])
    expect(result).toBe(completion)
  })
})

describe("applyCompletionOverrides dispatch and composition", () => {
  test("an unsupported card is a no-op", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [
      override(["whatever"], 1, "champion-points"),
    ])
    expect(result).toBe(completion)
  })

  test("applies multiple overrides in sequence", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
      override(["skyshards", "AD1"], 16),
    ])
    expect(result.skillPoints?.foliumDiscognitum).toBe(2)
    expect(result.skillPoints?.skyshards.AD1).toBe(16)
  })

  test("an empty override list returns the input reference", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    expect(applyCompletionOverrides(completion, [])).toBe(completion)
  })
})
