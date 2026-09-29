import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import {
  loreChanged,
  loreGathered,
} from "akasha/command/pages/story/turn/modules/turn-lore-gathered/turn-lore-gathered.module.code.ts"
import { loreKept } from "akasha/command/pages/story/turn/modules/turn-lore-in-play/turn-lore-in-play.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const WORLD = "story/world/pages/a-world"

const GAME = "the-saga"

const TURN = `${WORLD}/stories/played/${GAME}/turns/${GAME}-00-003.story-turn-played.ts`

const HELD_LORE = `${WORLD}/lore/held.lore.ts`

const NEXT_LORE = `${WORLD}/lore/next.lore.ts`

const NEXT_PLACE = `${WORLD}/places/next.place.ts`

const NEXT_MECHANIC = `${WORLD}/mechanics/next.world-mechanic.ts`

const KEPT_LORE = `${WORLD}/lore/kept.lore.ts`

const GRACE = "character-other/grace"

const GRACE_LORE = `${WORLD}/lore/grace.lore.ts`

function landed(root: string, message: string): undefined {
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", message])
  return undefined
}

function opened(): string {
  const root = scratch.rootFor("akasha-turn-lore-gathered-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  writing(root, TURN, "export const theSaga00003 = {}\n")
  writing(root, HELD_LORE, "export const held = {}\n")
  landed(root, "the turn opens")
  return root
}

function turnAt(): { at: string; value: Record<string, unknown> } {
  return { at: TURN, value: { lore: [] } }
}

function keptOver(
  about: readonly (readonly [string, string | null])[] = [],
  characters: readonly string[] = [],
  withheld: readonly string[] = []
): readonly string[] {
  return loreKept({
    stated: ["lore/kept", "lore/gone"],
    characters,
    changed: [NEXT_LORE],
    look: {
      pathOf: (page) => (page === "lore/kept" ? KEPT_LORE : null),
      personaOf: () => null,
      about,
      withheld,
    },
  })
}

test("a lore page and a place landed since the turn was made are named, and a mechanic is not", () => {
  const root = opened()
  writing(root, NEXT_LORE, "export const next = {}\n")
  writing(root, NEXT_PLACE, "export const elsewhere = {}\n")
  writing(root, NEXT_MECHANIC, "export const amechanic = {}\n")
  landed(root, "the world grows")
  expect(loreChanged(root, TURN, WORLD)).toEqual([NEXT_LORE, NEXT_PLACE])
})

test("a lore page changed since the turn was made is named, held page or not", () => {
  const root = opened()
  writing(root, HELD_LORE, "export const held = { one: 1 }\n")
  landed(root, "a page the turn already held changes")
  expect(loreChanged(root, TURN, WORLD)).toEqual([HELD_LORE])
})

test("a lore page landed before the turn was made is not named", () => {
  const root = opened()
  expect(loreChanged(root, TURN, WORLD)).toEqual([])
})

test("a lore page taken away since the turn was made is not named", () => {
  const root = opened()
  writing(root, NEXT_LORE, "export const next = {}\n")
  landed(root, "the world grows")
  rmSync(join(root, NEXT_LORE))
  landed(root, "the world loses it")
  expect(loreChanged(root, TURN, WORLD)).toEqual([])
})

test("a tree git answers nothing for names no page", () => {
  expect(loreChanged(scratch.rootFor("akasha-turn-lore-gathered-bare-"), TURN, WORLD)).toEqual([])
})

test("the list a turn holds is the world's new lore", () => {
  const root = opened()
  writing(root, NEXT_LORE, "export const next = {}\n")
  landed(root, "the world grows")
  expect(loreGathered(root, turnAt(), {}).values).toEqual({ lore: ["lore/next"] })
})

test("a turn whose world gained nothing and names no page holds no list", () => {
  const root = opened()
  expect(loreGathered(root, turnAt(), {}).values).toEqual({})
})

test("a listed address a page answers to is kept, an address no page answers to is dropped", () => {
  expect(keptOver()).toEqual(["lore/kept", "lore/next"])
})

test("lore about a character the turn names is added to the list as an address", () => {
  expect(keptOver([[GRACE_LORE, GRACE]], [GRACE])).toEqual(["lore/grace", "lore/kept", "lore/next"])
})

test("an added page withheld from a seat is left off the list, and a listed one stays", () => {
  expect(keptOver([[GRACE_LORE, GRACE]], [GRACE], [GRACE_LORE, KEPT_LORE])).toEqual([
    "lore/kept",
    "lore/next",
  ])
})
