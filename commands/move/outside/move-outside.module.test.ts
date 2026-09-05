import { afterAll, expect, test } from "bun:test"
import {
  idFiled,
  listedFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "@akasha/indexes/testing"
import { move } from "../move.command.code.ts"
import {
  BINARY,
  BINARY_BODY,
  bodyIn,
  FOLDER,
  FOLDER_AT,
  FOLDER_PAIR,
  givenIn,
  LOCK,
  LOCKED,
  outsideMoved,
  outsideWorld,
  REACHED,
  REACHER,
  reachMoved,
  scratch,
  told,
} from "../move.command.test-fixtures.ts"
import { outsideSaid, reachesIn, repointedText } from "./move-outside.module.code.ts"

afterAll(scratch.sweep)

const MOVED = new Map([[FOLDER, FOLDER_AT]])

const AT = "tools/lib/reach.ts"

const NAMED = "named-file-property"

const PROPERTY_AT = "akasha/lockfile.named-file-property.ts"

const PROPERTY_ID = "01a04bed-1450-7000-8000-00000000bbba"

const TYPE_AT = "akasha/workspace.page-type.ts"

const TYPE_ID = "01a04bed-1450-7000-8000-00000000bbbb"

const OWNER_AT = "tools/one.workspace.ts"

const OWNER_ID = "01a04bed-1450-7000-8000-00000000bbbc"

const LOCK_NAME = "lock.json"

function lockfileFiled(root: string): string {
  listedFiled(root, NAMED, "lockfile", [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  idFiled(root, PROPERTY_ID, [{ path: PROPERTY_AT, id: PROPERTY_ID }])
  schemaFiled(root, NAMED, "lockfile", [
    {
      pageTypeSlug: NAMED,
      targetPageTypeSlug: null,
      unique: null,
      slug: "lockfile",
      propertySlug: "lockfile",
      fileName: LOCK_NAME,
    },
  ])
  valueAlsoFiled(root, NAMED, [
    { path: PROPERTY_AT, value: { fileName: LOCK_NAME, machineWritten: true } },
  ])
  listedFiled(root, "page-type", "workspace", [{ path: TYPE_AT, id: TYPE_ID }])
  idFiled(root, TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  listedFiled(root, "workspace", "one", [{ path: OWNER_AT, id: OWNER_ID }])
  relationFiled(root, PROPERTY_ID, "page-property-slug", TYPE_ID, [{ path: TYPE_AT, id: TYPE_ID }])
  return root
}

test("a path spelled whole outside the akasha folder is repointed where it moved", () => {
  const said = repointedText(AT, '"akasha/one" "akasha/one-other"', MOVED)
  expect(said).toBe('"akasha/far/one" "akasha/one-other"')
})

test("a relative reach from outside is repointed to where what it resolves to arrived", () => {
  const said = repointedText(AT, '"../../akasha/one/held.module.ts"', MOVED)
  expect(said).toBe('"../../akasha/far/one/held.module.ts"')
})

test("a relative reach is resolved against the folder of the file carrying that reach", () => {
  const said = repointedText("tools/reach.ts", '"../akasha/one/held.module.ts"', MOVED)
  expect(said).toBe('"../akasha/far/one/held.module.ts"')
})

test("a relative reach closing with a slash keeps that slash and what follows the slash", () => {
  const said = repointedText(AT, '@source "../../akasha/one/**/*.ts"', MOVED)
  expect(said).toBe('@source "../../akasha/far/one/**/*.ts"')
})

test("a relative reach resolving to no path that moved is left alone", () => {
  const text = '"../../akasha/one-other/held.module.ts" "./one/held.module.ts"'
  expect(repointedText(AT, text, MOVED)).toBe(text)
})

test("a relative reach climbing out of the repository is left alone", () => {
  const text = '"../../../akasha/one/held.module.ts"'
  expect(repointedText(AT, text, MOVED)).toBe(text)
})

test("a reach is answered with where the reach sits and what it becomes", () => {
  const found = reachesIn(AT, 'x "../../akasha/one"', MOVED)
  expect(found.map((one) => one.now)).toEqual(["../../akasha/far/one"])
})

test("a body naming nothing that moved comes back as that body was", () => {
  expect(repointedText(LOCK, LOCKED, new Map())).toBe(LOCKED)
})

test("a file outside akasha reaching in by a relative path is repointed by a move", async () => {
  const { root, said } = await reachMoved()
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, REACHER)).toBe(REACHED)
})

test("what reached in by a relative path is told apart from what spelled the path whole", async () => {
  const { said } = await reachMoved()
  expect(told(said)).toContain(
    `reached in by a relative path rather than by the path itself — ${REACHER}`
  )
})

test("a body git reads as binary is left out of the search and out of the change", async () => {
  const { root, said } = await outsideMoved()
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, BINARY)).toBe(BINARY_BODY)
  expect(told(said)).not.toContain(BINARY)
})

test("a dry run writes nothing and names what it would repoint by its path", async () => {
  const root = outsideWorld()
  const said = await move([...FOLDER_PAIR, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, LOCK)).toBe(LOCKED)
  expect(told(said)).toContain(`spelling what moved by its path would be repointed — ${LOCK}`)
})

test("a file a machine writes is left alone rather than repointed", async () => {
  const root = lockfileFiled(outsideWorld())
  const said = await move(FOLDER_PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, LOCK)).toBe(LOCKED)
  expect(told(said)).toContain("no further file spelled what moved by its path")
})

test("a property saying an author writes the file leaves that file repointed", async () => {
  const { root, said } = await outsideMoved()
  expect(said.refusals).toEqual([])
  expect(told(said)).toContain(`spelling what moved by its path was repointed — ${LOCK}`)
})

test("finding no further file is said as plainly as finding something", () => {
  expect(outsideSaid([], [], false)[0]).toBe("no further file spelled what moved by its path")
  expect(outsideSaid([LOCK], [], true)[0]).toContain(`would be repointed — ${LOCK}`)
  expect(outsideSaid([], [], false)[1]).toContain("is left alone")
})
