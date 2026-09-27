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
  secretsIn,
  secretTargetsIn,
  untoldIn,
  WITHHELD,
  withheldAt,
  withheldFor,
  withheldIn,
  withheldPath,
  withholdingFor,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
  OUTSIDE_AT,
  RECORDER_SEAT,
  REVIEWER_SEAT,
  SECRETS_AT,
  TARGET_AT,
  TOLD_AT,
  toldAlso,
  UNDER_GAME_MASTER,
  WRITER_SEAT,
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

test("a reviewer's seat and a writer's seat are judged as a game master's", () => {
  const root = loreWorld(scratch)
  expect(gameMasterIn(root, REVIEWER_SEAT)).toBe(true)
  expect(gameMasterIn(root, WRITER_SEAT)).toBe(true)
  expect(gameMasterIn(root, `${WRITER_SEAT}--held-sub`)).toBe(true)
})

test("a reviewer and a writer are withheld what a game master is", () => {
  const root = loreWorld(scratch)
  const held = withheldFor(root, GAME_MASTER_SEAT)
  expect(withheldFor(root, REVIEWER_SEAT)).toEqual(held)
  expect(withheldFor(root, WRITER_SEAT)).toEqual(held)
  expect(withheldFor(root, REVIEWER_SEAT)).toContain(LORE_AT)
})

test("a story recorder's seat, and a subagent under it, are judged as a game master's", () => {
  const root = loreWorld(scratch)
  expect(gameMasterIn(root, RECORDER_SEAT)).toBe(true)
  expect(gameMasterIn(root, `${RECORDER_SEAT}--held-sub`)).toBe(true)
})

test("a story recorder is withheld what a game master is", () => {
  const root = loreWorld(scratch)
  const held = withheldFor(root, GAME_MASTER_SEAT)
  expect(withheldFor(root, RECORDER_SEAT)).toEqual(held)
  expect(withheldFor(root, RECORDER_SEAT)).toContain(LORE_AT)
  expect(withheldFor(root, `${RECORDER_SEAT}--held-sub`)).toEqual(held)
})

test("a seat of another role, or no agent at all, is no game master's", () => {
  const root = loreWorld(scratch)
  expect(gameMasterIn(root, OTHER_SEAT)).toBe(false)
  expect(gameMasterIn(root, null)).toBe(false)
  expect(gameMasterIn(root, "")).toBe(false)
})

test("a game master is withheld every lore page telling no fact, and the page it is about", () => {
  const root = loreWorld(scratch)
  expect(untoldIn(root)).toEqual([LORE_AT])
  expect(withheldFor(root, GAME_MASTER_SEAT)).toEqual([LORE_AT, TARGET_AT])
})

test("a lore page telling a fact is withheld no longer, and neither is its target", () => {
  const root = loreWorld(scratch, undefined, true)
  expect(untoldIn(root)).toEqual([])
  expect(withheldIn(root)).toEqual([])
})

test("the secrets beside a lore page are withheld even where the page tells a fact", () => {
  const root = loreWorld(scratch)
  toldAlso(root)
  expect(secretsIn(root)).toEqual([SECRETS_AT])
  expect(withheldIn(root)).toContain(SECRETS_AT)
  expect(withheldIn(root)).not.toContain("story/world/pages/held/lore/told.lore.ts")
})

test("a story page every lore page about which tells no fact is withheld", () => {
  const root = loreWorld(scratch)
  expect(secretTargetsIn(root, [LORE_AT])).toEqual([TARGET_AT])
})

test("a page some lore about it tells is withheld no longer", () => {
  const root = loreWorld(scratch)
  toldAlso(root)
  expect(secretTargetsIn(root, [LORE_AT])).toEqual([])
})

test("a page outside the stories is never withheld for the lore about it", () => {
  const root = loreWorld(scratch, "persona/held")
  expect(secretTargetsIn(root, [LORE_AT])).toEqual([])
  expect(withheldIn(root)).toEqual([LORE_AT])
  expect(OUTSIDE_AT.startsWith("story/")).toBe(false)
})

const ASKED_ABOUT: readonly string[] = [
  LORE_AT,
  TARGET_AT,
  SECRETS_AT,
  TOLD_AT,
  OUTSIDE_AT,
  "story/world/pages/held/lore/sealed.lore.referenced-by.jsonl",
  "story/world/pages/held/lore/sealed.lore.secrets.jsonl",
  "agent/seat/pages/held/held.seat.ts",
]

function agreeing(root: string): undefined {
  const every = withheldIn(root)
  for (const one of ASKED_ABOUT)
    expect([one, withheldPath(root, one)]).toEqual([one, every.includes(one)])
}

test("one path is withheld exactly where the whole list withholds it", () => {
  agreeing(loreWorld(scratch))
  agreeing(loreWorld(scratch, undefined, true))
  agreeing(loreWorld(scratch, "persona/held"))
  const told = loreWorld(scratch)
  toldAlso(told)
  agreeing(told)
})

test("only a game master's seat is handed a check on each path", () => {
  const root = loreWorld(scratch)
  expect(withholdingFor(root, OTHER_SEAT)).toBeNull()
  expect(withholdingFor(root, null)).toBeNull()
  expect(withholdingFor(root, GAME_MASTER_SEAT)?.(LORE_AT)).toBe(true)
  expect(withholdingFor(root, GAME_MASTER_SEAT)?.(OUTSIDE_AT)).toBe(false)
})

test("every other caller is withheld nothing", () => {
  const root = loreWorld(scratch)
  expect(withheldFor(root, OTHER_SEAT)).toEqual([])
  expect(withheldFor(root, null)).toEqual([])
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

test("the refusal is true of every role held, so it names no role as the seat's", () => {
  const said = WITHHELD.join(" ")
  expect(said).toContain("your seat reads only the lore told to the game master")
  expect(said).not.toContain("game master's")
})
