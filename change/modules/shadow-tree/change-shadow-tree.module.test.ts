import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  addedTo,
  type Ledger,
  ledgerAt,
  worldAt,
  worldOver,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  namesOver,
  treeClaimed,
  treeTracked,
  treeUnder,
  treeUnentered,
} from "akasha/change/modules/shadow-tree/change-shadow-tree.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  carriedPage,
  HELD_CODE,
  indexedRepo,
  put,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const FROM = "akasha/four"

const ALPHA_ID = "01a04a4a-0003-7000-8000-000000000001"

const ALPHA_PAGE = `${FROM}/alpha.module.ts`

const ALPHA_CODE = `${FROM}/alpha.module.code.ts`

const FRESH = `${FROM}/fresh.txt`

const MOVED = `${FROM}/deep/alpha.module.code.ts`

const SIDECAR = `${FROM}/alpha.module.entries.uncommitted.jsonl`

const IGNORING = ".gitignore"

const MODULE = "module"

const ROUTES = "routes"

const ROUTES_AT = ".react-router"

const CLAIMED = `${FROM}/${ROUTES_AT}`

const ROUTES_AT_TYPES = `${CLAIMED}/types`

const ROUTES_CODE = `${ROUTES_AT_TYPES}/routes.ts`

const LEFT_OUT = { folder: ROUTES_AT_TYPES, claimant: ALPHA_PAGE }

const ROUTES_BODY = "export const routes = 1\n"

const HELD: Readonly<Record<string, string>> = {
  [ALPHA_PAGE]: carriedPage("alpha", ALPHA_ID),
  [ALPHA_CODE]: "export const alpha = 1\n",
}

const BARE: Readonly<Record<string, string>> = { [`${FROM}/notes.txt`]: "one\n" }

const NOTHING = stating([])

function indexIn(root: string): Answering {
  return shadowAt(root).index
}

function faceIn(root: string): Answering {
  return {
    ...indexIn(root),
    folderPropertiesAt: () => new Map([[MODULE, new Map([[ROUTES, ROUTES_AT]])]]),
  }
}

test("a path the answer writes is among the paths under that folder", () => {
  const root = indexedRepo(HELD)
  const said = stating([{ kind: "add", path: FRESH, content: "one\n" }])

  expect(treeUnder(root, FROM, indexIn(root), said)).toContain(FRESH)
})

test("a path the answer takes away is left out of the paths under that folder", () => {
  const root = indexedRepo(HELD)
  const said = stating([{ kind: "remove", path: ALPHA_CODE }])

  const found = treeUnder(root, FROM, indexIn(root), said)

  expect(found).not.toContain(ALPHA_CODE)
  expect(found).toContain(ALPHA_PAGE)
})

test("a path the answer moves is left out where it was and among the paths where it lands", () => {
  const root = indexedRepo(HELD)
  const said = stating([{ kind: "move", pathFrom: ALPHA_CODE, pathTo: MOVED }])

  const found = treeUnder(root, FROM, indexIn(root), said)

  expect(found).not.toContain(ALPHA_CODE)
  expect(found).toContain(MOVED)
})

test("a page the answer writes claims the folder that page names", () => {
  const root = indexedRepo(BARE)
  put(root, ROUTES_CODE, ROUTES_BODY)
  const face = faceIn(root)
  const said = stating([{ kind: "add", path: ALPHA_PAGE, content: carriedPage("alpha", ALPHA_ID) }])

  expect(treeUnder(root, FROM, face, NOTHING)).toContain(ROUTES_CODE)
  expect(treeUnder(root, FROM, face, said)).not.toContain(ROUTES_CODE)
})

test("a page the answer takes away claims no folder", () => {
  const root = indexedRepo(HELD)
  put(root, ROUTES_CODE, ROUTES_BODY)
  const face = faceIn(root)
  const said = stating([{ kind: "remove", path: ALPHA_PAGE }])

  expect(treeUnder(root, FROM, face, NOTHING)).not.toContain(ROUTES_CODE)
  expect(treeUnder(root, FROM, face, said)).toContain(ROUTES_CODE)
})

test("a folder claimed by a page under the folder answers the files that folder holds", () => {
  const root = indexedRepo(HELD)
  put(root, ROUTES_CODE, ROUTES_BODY)
  const face = faceIn(root)

  expect(treeClaimed(root, FROM, face, NOTHING)).toEqual([ROUTES_CODE])
  expect(treeUnentered(root, FROM, face, NOTHING)).toEqual([])
})

test("a file the answer writes under such a folder is among the files that folder holds", () => {
  const root = indexedRepo(HELD)
  const said = stating([{ kind: "add", path: ROUTES_CODE, content: ROUTES_BODY }])

  expect(treeClaimed(root, FROM, faceIn(root), said)).toEqual([ROUTES_CODE])
})

test("a folder claimed by a page outside the folder is among the folders left out", () => {
  const root = indexedRepo(HELD)
  put(root, ROUTES_CODE, ROUTES_BODY)
  const face = faceIn(root)

  expect(treeUnentered(root, CLAIMED, face, NOTHING)).toEqual([LEFT_OUT])
  expect(treeClaimed(root, CLAIMED, face, NOTHING)).toEqual([])
})

test("a folder the answer takes every file away from is left out of that answer", () => {
  const root = indexedRepo(HELD)
  put(root, ROUTES_CODE, ROUTES_BODY)
  const face = faceIn(root)
  const said = stating([{ kind: "remove", path: ROUTES_CODE }])

  expect(treeUnentered(root, CLAIMED, face, NOTHING)).toEqual([LEFT_OUT])
  expect(treeUnentered(root, CLAIMED, face, said)).toEqual([])
})

test("a path the answer writes is among the files tracked under that folder", () => {
  const root = indexedRepo(HELD)
  const said = stating([{ kind: "add", path: FRESH, content: "one\n" }])

  expect(treeTracked(root, FROM, said)).toContain(FRESH)
})

test("a path the answer takes away is left out of the files tracked under that folder", () => {
  const root = indexedRepo(HELD)
  const said = stating([{ kind: "remove", path: ALPHA_CODE }])

  const found = treeTracked(root, FROM, said)

  expect(found).not.toContain(ALPHA_CODE)
  expect(found).toContain(ALPHA_PAGE)
})

test("the root folder answers the files tracked under it rather than answering nothing", () => {
  const root = indexedRepo(HELD)

  const found = treeTracked(root, "", NOTHING)

  expect(found).toContain(ALPHA_PAGE)
  expect(found).toEqual(treeTracked(root, ".", NOTHING))
})

test("a file the tree holds that git ignores is among the files tracked under that folder", () => {
  const root = indexedRepo(HELD)
  put(root, IGNORING, "*.uncommitted.jsonl\n")
  put(root, SIDECAR, "one\n")

  expect(treeTracked(root, FROM, NOTHING)).toContain(SIDECAR)
})

test("a file git tracks that the tree no longer holds is left out of the files tracked", () => {
  const root = indexedRepo(HELD)
  rmSync(join(root, ALPHA_CODE))

  const found = treeTracked(root, FROM, NOTHING)

  expect(found).not.toContain(ALPHA_CODE)
  expect(found).toContain(ALPHA_PAGE)
})

const ONE_AT = "akasha/one"

const FRESH_ONE = `${ONE_AT}/fresh.module.code.ts`

function ledgerBoth(): Ledger {
  const root = indexedRepo()
  const ledger = ledgerAt(root, textIn(root))
  addedTo(ledger, stating([{ kind: "remove", path: HELD_CODE }]))
  addedTo(ledger, stating([{ kind: "add", path: FRESH_ONE, content: "held\n" }]))
  return ledger
}

test("the paths under a folder are read with every edit added to the ledger laid over", () => {
  const found = ledgerBoth().under(ONE_AT)

  expect(found).toContain(FRESH_ONE)
  expect(found).not.toContain(HELD_CODE)
})

test("the files tracked under a folder are read with every edit added to the ledger laid over", () => {
  const found = ledgerBoth().tracked?.(ONE_AT) ?? []

  expect(found).toContain(FRESH_ONE)
  expect(found).not.toContain(HELD_CODE)
})

const NOTES = `${FROM}/notes.txt`

const NAMING: Readonly<Record<string, string>> = { ...HELD, [NOTES]: "one\n" }

const WRITING = stating([{ kind: "add", path: ROUTES_CODE, content: ROUTES_BODY }])

test("a path the tree holds names something whether or not the index has that path", () => {
  const names = namesOver(indexedRepo(NAMING), NOTHING)

  expect(names(NOTES)).toBe(true)
  expect(names(ALPHA_CODE)).toBe(true)
  expect(names(FROM)).toBe(true)
  expect(names(`${FROM}/nowhere.txt`)).toBe(false)
})

test("a path the answer writes names something though the tree holds that path nowhere", () => {
  const names = namesOver(indexedRepo(NAMING), WRITING)

  expect(names(ROUTES_CODE)).toBe(true)
})

test("a folder above a path the answer writes names something too", () => {
  const names = namesOver(indexedRepo(NAMING), WRITING)

  expect(names(CLAIMED)).toBe(true)
})

test("a path the answer takes away names nothing though the tree holds that path", () => {
  const names = namesOver(indexedRepo(NAMING), stating([{ kind: "remove", path: ALPHA_CODE }]))

  expect(names(ALPHA_CODE)).toBe(false)
  expect(names(ALPHA_PAGE)).toBe(true)
})

test("a path spelled outside the checkout names nothing", () => {
  const names = namesOver(indexedRepo(NAMING), NOTHING)

  expect(names("../akasha")).toBe(false)
  expect(names(`/${ALPHA_CODE}`)).toBe(false)
  expect(names("")).toBe(false)
})

test("a path is named with every edit added to the ledger laid over", () => {
  const ledger = ledgerBoth()

  expect(ledger.names?.(FRESH_ONE)).toBe(true)
  expect(ledger.names?.(HELD_CODE)).toBe(false)
})

test("a world says whether a path names a file or a folder in the checkout", () => {
  const root = indexedRepo()
  const world = worldAt(root, textIn(root))

  expect(world.names?.(HELD_CODE)).toBe(true)
  expect(world.names?.(ONE_AT)).toBe(true)
  expect(world.names?.(FRESH_ONE)).toBe(false)
})

test("a world over an answer names a path with that answer laid over", () => {
  const root = indexedRepo()
  const world = worldOver(
    worldAt(root, textIn(root)),
    stating([{ kind: "move", pathFrom: HELD_CODE, pathTo: FRESH_ONE }])
  )

  expect(world.names?.(FRESH_ONE)).toBe(true)
  expect(world.names?.(HELD_CODE)).toBe(false)
})
