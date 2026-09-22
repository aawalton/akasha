import { expect, test } from "bun:test"
import {
  taskHasCard,
  taskHasCardAndPathEntry,
} from "akasha/temper/addon/pages/characters/modules/characters-task-card-match/characters-task-card-match.module.code.ts"
import type { TaskData } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"

const LORE = "lore-library-character"

function task(completionCardId: string, completionItemPath?: (string | number)[]): TaskData {
  return {
    title: "Shalidor's Library",
    scope: "next_character",
    sortOrder: 15,
    completionCardId,
    completionItemPath,
  }
}

test("a task naming the card is met and one naming another card is not", () => {
  expect(taskHasCard(task(LORE), LORE)).toBe(true)
  expect(taskHasCard(task("cadwells-almanac"), LORE)).toBe(false)
})

test("a step spelled as text meets a caller naming the same number", () => {
  expect(taskHasCardAndPathEntry(task(LORE, ["1"]), LORE, 0, 1)).toBe(true)
})

test("a step held as a number meets a caller naming the same number", () => {
  expect(taskHasCardAndPathEntry(task(LORE, [1]), LORE, 0, 1)).toBe(true)
})

test("a step reading as something else is not met", () => {
  expect(taskHasCardAndPathEntry(task(LORE, ["2"]), LORE, 0, 1)).toBe(false)
})

test("a step at an index the path does not reach is not met", () => {
  expect(taskHasCardAndPathEntry(task(LORE, ["1"]), LORE, 2, 1)).toBe(false)
  expect(taskHasCardAndPathEntry(task(LORE), LORE, 0, 1)).toBe(false)
})

test("a step under another card is not met", () => {
  expect(taskHasCardAndPathEntry(task("cadwells-almanac", ["1"]), LORE, 0, 1)).toBe(false)
})

test("a step naming an achievement deeper in the path is met by how it reads", () => {
  const dragonguard = task("character-achievements", ["Dragonhold", "Quests", "2612"])
  expect(taskHasCardAndPathEntry(dragonguard, "character-achievements", 2, 2612)).toBe(true)
})
