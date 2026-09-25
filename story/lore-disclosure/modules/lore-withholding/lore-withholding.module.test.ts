import { afterAll, expect, test } from "bun:test"
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { storeIn, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  ASKED,
  gameMasterIn,
  globReach,
  reachesWithheld,
  seatOf,
  WITHHELD,
  withheldAt,
  withheldFor,
  withheldIn,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import {
  DISCLOSURE_AT,
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
  referencesWritten,
  UNDER_GAME_MASTER,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function copied(at: string): undefined {
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, "copy\n")
}

test("a seat the game master role's references name by role is a game master's", () => {
  const root = loreWorld(scratch)
  expect(gameMasterIn(root, GAME_MASTER_SEAT)).toBe(true)
})

test("a subagent under a game master's seat is judged by that seat", () => {
  const root = loreWorld(scratch)
  expect(seatOf(UNDER_GAME_MASTER)).toBe(GAME_MASTER_SEAT)
  expect(gameMasterIn(root, UNDER_GAME_MASTER)).toBe(true)
})

test("a seat of another role, or no agent at all, is no game master's", () => {
  const root = loreWorld(scratch)
  expect(gameMasterIn(root, OTHER_SEAT)).toBe(false)
  expect(gameMasterIn(root, null)).toBe(false)
  expect(gameMasterIn(root, "")).toBe(false)
})

test("a game master is withheld every page the world builder's references name", () => {
  const root = loreWorld(scratch)
  expect(withheldFor(root, GAME_MASTER_SEAT)).toEqual([LORE_AT])
})

test("every other caller is withheld nothing", () => {
  const root = loreWorld(scratch)
  expect(withheldFor(root, OTHER_SEAT)).toEqual([])
  expect(withheldFor(root, null)).toEqual([])
})

test("a page moved down from world-builder disclosure is withheld no longer", () => {
  const root = loreWorld(scratch)
  referencesWritten(root, DISCLOSURE_AT, [])
  expect(withheldIn(root)).toEqual([])
})

test("a withheld page is reached by its path, by a copy in a tree, and by a link", () => {
  const root = loreWorld(scratch)
  const copy = storeIn(root, TREES, "other", LORE_AT)
  copied(copy)
  const away = realpathSync(scratch.rootFor("lore-withholding-away-"))
  symlinkSync(join(root, LORE_AT), join(away, "pointer.ts"))
  expect(withheldAt(join(root, LORE_AT), [LORE_AT])).toBe(true)
  expect(withheldAt(copy, [LORE_AT])).toBe(true)
  expect(withheldAt(join(away, "pointer.ts"), [LORE_AT])).toBe(true)
  expect(withheldAt(join(root, "agent", "held.ts"), [LORE_AT])).toBe(false)
})

test("a folder holding a withheld page or a copy of one reaches it", () => {
  const root = loreWorld(scratch)
  copied(storeIn(root, TREES, "other", LORE_AT))
  expect(reachesWithheld(root, root, [LORE_AT])).toBe(true)
  expect(reachesWithheld(join(root, "story", "world"), root, [LORE_AT])).toBe(true)
  expect(reachesWithheld(storeIn(root, TREES), root, [LORE_AT])).toBe(true)
  expect(reachesWithheld(dirname(root), root, [LORE_AT])).toBe(true)
})

test("a folder holding no withheld page does not reach one", () => {
  const root = loreWorld(scratch)
  expect(reachesWithheld(join(root, "agent"), root, [LORE_AT])).toBe(false)
  expect(reachesWithheld(root, root, [])).toBe(false)
})

test("a glob reaching a withheld page is told from one reaching a folder above it", () => {
  const root = loreWorld(scratch)
  expect(globReach(join(root, "story/*/pages/held/lore/*.ts"), root, [LORE_AT])).toBe("file")
  expect(globReach(join(root, "st*"), root, [LORE_AT])).toBe("folder")
  expect(globReach(join(root, "agent/*"), root, [LORE_AT])).toBeNull()
})

test("the refusal names the question to ask and nothing from inside the page", () => {
  const said = WITHHELD.join("\n")
  expect(said).toContain(ASKED)
  expect(said).toContain("world builder")
  expect(said).not.toContain("sealed")
})
