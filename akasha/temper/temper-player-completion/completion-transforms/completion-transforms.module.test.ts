import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import type {
  TraitResearchCatalogCraftType,
  TraitResearchCatalogLine,
} from "../completion-trait-research-progress/completion-trait-research-progress.module.code.ts"
import { transformCompletionCharacters } from "./completion-transforms.module.code.ts"

const ROSTER_ONLY: CharacterCompletion = {
  gender: 1,
  level: 27,
  classId: 3,
  allianceId: 2,
  raceId: 5,
  className: "Sorcerer",
  classIcon: "/esoui/art/class/sorcerer.dds",
}

const MAX_CHARACTER_LEVEL = 50
const MAX_PACK_UPGRADES = 8

const CRAFT_TYPES: readonly TraitResearchCatalogCraftType[] = [
  { slug: "blacksmithing", title: "Blacksmithing", esoCraftTypeId: 1 },
]

const RESEARCH_LINES: readonly TraitResearchCatalogLine[] = [
  {
    slug: "axe",
    title: "Axe",
    displayOrder: 1,
    parent: "blacksmithing",
    traits: [
      { traitIndex: 1, traitName: "Powered" },
      { traitIndex: 2, traitName: "Charged" },
      { traitIndex: 3, traitName: "Precise" },
    ],
  },
]

function row(id: string, completion: CharacterCompletion | null): CompletionCharacterRow {
  return {
    id,
    userId: "user-1",
    esoCharacterId: `eso-${id}`,
    title: id,
    completion,
    createdAt: 0,
    updatedAt: 0,
    roles: [],
  }
}

function transform(
  rows: readonly CompletionCharacterRow[],
  accountCollectibles?: readonly number[]
) {
  return transformCompletionCharacters(rows, CRAFT_TYPES, RESEARCH_LINES, accountCollectibles)
}

describe("transformCompletionCharacters — an unread character is left out", () => {
  test("a character carrying only roster fields is left out of every returned array", () => {
    const result = transform([row("never-played", ROSTER_ONLY)])

    expect(result.characters).toEqual([])
    expect(result.progress).toEqual([])
    expect(result.morphProgress).toEqual([])
    expect(result.recipeProgress).toEqual([])
    expect(result.scribingProgress).toEqual([])
    expect(result.traitResearchProgress).toEqual([])
    expect(result.mountTrainingProgress).toEqual([])
    expect(result.packUpgradesProgress).toEqual([])
  })

  test("a null completion is left out too", () => {
    const result = transform([row("no-blob", null)])
    expect(result.characters).toEqual([])
    expect(result.mountTrainingProgress).toEqual([])
    expect(result.packUpgradesProgress).toEqual([])
  })

  test("an empty deferred value counts as read and carries the whole static denominator", () => {
    const result = transform([row("played", { ...ROSTER_ONLY, quests: [] })])

    expect(result.characters).toHaveLength(1)
    expect(result.characters[0]?.level).toBe(27)
    expect(result.characters[0]?.maxLevel).toBe(MAX_CHARACTER_LEVEL)

    expect(result.mountTrainingProgress).toHaveLength(1)
    expect(result.mountTrainingProgress[0]?.maxSpeed).toBe(60)
    expect(result.mountTrainingProgress[0]?.maxStamina).toBe(60)
    expect(result.mountTrainingProgress[0]?.maxCarryCapacity).toBe(60)

    expect(result.packUpgradesProgress).toHaveLength(1)
    expect(result.packUpgradesProgress[0]?.maxPackUpgrades).toBe(MAX_PACK_UPGRADES)

    expect(result.recipeProgress).toHaveLength(1)
    expect(result.recipeProgress[0]?.entries.length).toBeGreaterThan(0)
    expect(result.scribingProgress).toHaveLength(1)
    expect(result.scribingProgress[0]?.grimoires.length).toBeGreaterThan(0)

    expect(result.progress).toHaveLength(1)
    expect(result.progress[0]?.entries).toEqual([])
  })
})

describe("transformCompletionCharacters — roster against read", () => {
  test("rosterSize counts every row while measuredCharacterCount counts only the read ones", () => {
    const result = transform([
      row("played", { ...ROSTER_ONLY, quests: [] }),
      row("never-played", ROSTER_ONLY),
    ])

    expect(result.rosterSize).toBe(2)
    expect(result.measuredCharacterCount).toBe(1)
  })

  test("a mixed roster of 2 read and 2 roster-only yields 4 and 2", () => {
    const result = transform([
      row("played-a", { ...ROSTER_ONLY, quests: [] }),
      row("never-played-a", ROSTER_ONLY),
      row("played-b", { ...ROSTER_ONLY, traitResearch: {} }),
      row("never-played-b", ROSTER_ONLY),
    ])

    expect(result.rosterSize).toBe(4)
    expect(result.measuredCharacterCount).toBe(2)
    expect(result.characters.map((c) => c.id)).toEqual(["played-a", "played-b"])
  })

  test("an empty roster reports zero for both", () => {
    const result = transform([])
    expect(result.rosterSize).toBe(0)
    expect(result.measuredCharacterCount).toBe(0)
  })
})

describe("transformCompletionCharacters — no invented level", () => {
  test("a read character with no level contributes neither numerator nor denominator", () => {
    const result = transform([row("no-level", { quests: [] })])
    const character = result.characters[0]

    expect(result.characters).toHaveLength(1)
    expect(character?.level ?? 0).toBe(0)
    expect(character?.maxLevel ?? 0).toBe(0)
  })

  test("a read character with a level keeps the real static denominator", () => {
    const result = transform([row("lvl-9", { level: 9, quests: [] })])
    expect(result.characters[0]?.level).toBe(9)
    expect(result.characters[0]?.maxLevel).toBe(MAX_CHARACTER_LEVEL)
  })
})

describe("transformCompletionCharacters — the arguments after the rows", () => {
  test("the trait research tally counts against the catalog handed in as arguments two and three", () => {
    const result = transform([row("played", { ...ROSTER_ONLY, quests: [] })])

    expect(result.traitResearchProgress).toHaveLength(1)
    expect(result.traitResearchProgress[0]?.totalCount).toBe(3)
    expect(result.traitResearchProgress[0]?.knownCount).toBe(0)
    expect(result.traitResearchProgress[0]?.craftTypes.map((c) => c.craftingType)).toEqual([1])
  })

  test("a storage pet named in the fourth argument lowers the pack upgrades read off a bag", () => {
    const withPet = transform([row("packed", { ...ROSTER_ONLY, bagSize: 95 })], [4739])
    const withoutPet = transform([row("packed", { ...ROSTER_ONLY, bagSize: 95 })])

    expect(withPet.packUpgradesProgress[0]?.packUpgrades).toBe(3)
    expect(withoutPet.packUpgradesProgress[0]?.packUpgrades).toBe(4)
  })

  test("a pack upgrade count is held between zero and the most a bag admits", () => {
    const tiny = transform([row("tiny", { ...ROSTER_ONLY, bagSize: 10 })])
    const huge = transform([row("huge", { ...ROSTER_ONLY, bagSize: 9000 })])

    expect(tiny.packUpgradesProgress[0]?.packUpgrades).toBe(0)
    expect(huge.packUpgradesProgress[0]?.packUpgrades).toBe(MAX_PACK_UPGRADES)
  })
})
