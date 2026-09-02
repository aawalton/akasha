import { expect, test } from "bun:test"
import {
  CHARACTER_TOGGLE_NAMES,
  COMPANION_TOGGLE_NAMES,
  characterToggleNamesSaid,
  companionToggleNamesSaid,
  isCharacterToggleName,
  isCompanionToggleName,
} from "./automation-toggles.module.code.ts"

test("a name written twice in one list would be caught here", () => {
  expect(new Set(CHARACTER_TOGGLE_NAMES).size).toBe(CHARACTER_TOGGLE_NAMES.length)
  expect(new Set(COMPANION_TOGGLE_NAMES).size).toBe(COMPANION_TOGGLE_NAMES.length)
})

test("a character is automated by more than a companion is", () => {
  expect(CHARACTER_TOGGLE_NAMES.length).toBeGreaterThan(COMPANION_TOGGLE_NAMES.length)
})

test("worn gear is locked by a character toggle", () => {
  expect(isCharacterToggleName("lockWornGear")).toBe(true)
})

test("equipment is carried by a character and by a companion alike", () => {
  expect(isCharacterToggleName("equipment")).toBe(true)
  expect(isCompanionToggleName("equipment")).toBe(true)
})

test("food is carried by a character and by no companion", () => {
  expect(isCharacterToggleName("food")).toBe(true)
  expect(isCompanionToggleName("food")).toBe(false)
})

test("a name neither list holds is no toggle", () => {
  expect(isCharacterToggleName("mounts")).toBe(false)
  expect(isCompanionToggleName("mounts")).toBe(false)
})

test("the names are said in the order they are written in", () => {
  expect(characterToggleNamesSaid().startsWith("equipment, lockWornGear, food")).toBe(true)
  expect(companionToggleNamesSaid()).toBe("equipment, skills")
})
