import { expect, test } from "bun:test"
import { STYLE_TO_CHAPTERS } from "@akasha/temper-items-core/motif-chapter-set"
import type { CharacterKnowledge } from "../inventory-characters-reading/inventory-characters-reading.module.code.ts"
import { buildCliEvalEnv } from "./inventory-eval-env.module.code.ts"

const STYLED = 1

const CHAPTERS_OF_STYLED = STYLE_TO_CHAPTERS[STYLED] ?? []

function knowing(over: Partial<CharacterKnowledge>): CharacterKnowledge {
  return {
    id: "111",
    name: "Ayrenn",
    recipeResultItemIds: new Set<number>(),
    motifChaptersByStyle: new Map(),
    motifKnowledgeByStyle: new Map(),
    unlockedScriptIds: new Set<number>(),
    ...over,
  }
}

function envOf(one: CharacterKnowledge) {
  return buildCliEvalEnv({
    charactersById: new Map([[one.id, one]]),
    characterPriority: [one.id],
    wantedConsumables: {},
  })
}

test("a recipe a character knows reads as known, and one it does not reads as unknown", () => {
  const env = envOf(knowing({ recipeResultItemIds: new Set([41]) }))
  expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 41 }, "111")).toBe(true)
  expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 42 }, "111")).toBe(false)
})

test("a character nobody has heard of knows nothing", () => {
  const env = envOf(knowing({ recipeResultItemIds: new Set([41]) }))
  expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 41 }, "999")).toBe(false)
})

test("any character knowing it is enough", () => {
  const env = envOf(knowing({ unlockedScriptIds: new Set([5]) }))
  expect(env.isKnownByAnyCharacter({ kind: "script", scriptId: 5 })).toBe(true)
  expect(env.isKnownByAnyCharacter({ kind: "script", scriptId: 6 })).toBe(false)
})

test("a motif with no chapter named is known only where every chapter of it is known", () => {
  const all = envOf(
    knowing({ motifKnowledgeByStyle: new Map([[STYLED, new Set(CHAPTERS_OF_STYLED)]]) })
  )
  expect(all.isKnownByCharacter({ kind: "motif", styleId: STYLED, chapterId: null }, "111")).toBe(
    CHAPTERS_OF_STYLED.length > 0
  )
  const some = envOf(knowing({ motifKnowledgeByStyle: new Map([[STYLED, new Set([1])]]) }))
  expect(some.isKnownByCharacter({ kind: "motif", styleId: STYLED, chapterId: null }, "111")).toBe(
    CHAPTERS_OF_STYLED.length === 1
  )
})

test("a style the chapter table has never heard of is known by nobody", () => {
  const env = envOf(knowing({ motifKnowledgeByStyle: new Map([[999999, new Set([1])]]) }))
  expect(env.isKnownByCharacter({ kind: "motif", styleId: 999999, chapterId: null }, "111")).toBe(
    false
  )
})

test("a consumable is known by nobody off the game", () => {
  const env = envOf(knowing({}))
  expect(env.isKnownByAnyCharacter({ kind: "consumable", itemId: 1 })).toBe(false)
})

test("what only the running game knows is answered unknown rather than guessed", () => {
  const env = envOf(knowing({}))
  expect(env.getCurrentCharacter()).toBe("unknown")
  expect(env.getConsumableStock(1, "111")).toBe("unknown")
  expect(env.isTraitResearched(1, 2, "111")).toBe("unknown")
  expect(env.getTransmuteCrystalCap()).toBe("unknown")
})

test("the characters and their order are answered from what was read", () => {
  const env = envOf(knowing({}))
  expect(env.getAllCharacters()).toEqual(["111"])
  expect(env.getCharacterPriority()).toEqual(["111"])
})
