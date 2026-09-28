import { expect, test } from "bun:test"
import {
  type Describing,
  describedIn,
  storyFolderOf,
} from "akasha/command/pages/story/turn/advance/modules/turn-described/turn-described.module.code.ts"

const KINDS: ReadonlySet<string> = new Set(["world-mechanic", "world-skill", "world-item"])

const NEW = "w/mechanics/skills/sight.world-skill.ts"

const REWORDED = "w/mechanics/items/coin.world-item.ts"

const UNTOUCHED = "w/mechanics/items/key.world-item.ts"

const LORE = "w/lore/hall.lore.ts"

const DESCRIPTIONS: Record<string, { before: string | null; after: string | null }> = {
  [NEW]: { before: null, after: "A glance shows a shelf." },
  [REWORDED]: { before: "An old coin.", after: "A coin." },
  [UNTOUCHED]: { before: "A key.", after: "A key." },
  [LORE]: { before: null, after: "A hall." },
}

const describing: Describing = (path) => DESCRIPTIONS[path] ?? { before: null, after: null }

test("a mechanic whose description is new or reworded since the turn opened is named", () => {
  expect(describedIn([UNTOUCHED, REWORDED, NEW, LORE], KINDS, describing)).toEqual([REWORDED, NEW])
})

test("a mechanic changed elsewhere than its description is not named", () => {
  expect(describedIn([UNTOUCHED], KINDS, describing)).toEqual([])
})

test("a page of no mechanic kind is not named", () => {
  expect(describedIn([LORE], KINDS, describing)).toEqual([])
})

test("a turn is looked at under its own story's folder, never its world's", () => {
  expect(storyFolderOf("w/stories/played/game/turns/game-00-004.story-turn-played.ts")).toBe(
    "w/stories/played/game"
  )
})

test("a page under no story has no story folder", () => {
  expect(storyFolderOf("w/mechanics/items/coin.world-item.ts")).toBeNull()
})
