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
  CARRY,
  FOLDER,
  FOLDER_AT,
  FOLDER_PAIR,
  givenIn,
  LOCK,
  LOCKED,
  OTHER,
  outsideMoved,
  outsideWorld,
  REACHED,
  REACHER,
  reachMoved,
  rebuilt,
  repoWith,
  scratch,
  TARGET,
  told,
} from "../move.command.test-fixtures.ts"
import {
  alikeSaid,
  arrivalOf,
  beneathNames,
  outsideSaid,
  reachesIn,
  repointedText,
} from "./move-outside.module.code.ts"

const TABLE = "akasha/one/routes.ts"

const ROUTE = "akasha/one/routes/api.$.ts"

const ROUTE_AT = "akasha/one/routes/no-such/no-such.route.code.ts"

const TABLE_CODE = `export const routes = [["api/*", "routes/api.$.ts"]]\n`

const TABLE_REPOINTED = `export const routes = [["api/*", "routes/no-such/no-such.route.code.ts"]]\n`

const ALIKE = "akasha/one/alike.module.code.ts"

const ALIKE_CODE = `export const said = ["two/other.module.code.ts"]\n`

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

test("the longest folder that moved is the one a path beneath it arrives under", () => {
  const moved = new Map([
    ["akasha/one", "far/one"],
    ["akasha/one/two", "elsewhere/two"],
  ])
  expect(arrivalOf("akasha/one/two/held.ts", moved)).toBe("elsewhere/two/held.ts")
  expect(arrivalOf("akasha/one/other/held.ts", moved)).toBe("far/one/other/held.ts")
  expect(arrivalOf("akasha/one/two", moved)).toBe("elsewhere/two")
  expect(arrivalOf("akasha/other/held.ts", moved)).toBe(null)
})

test("the tail of a path that moved from each folder above it is looked for too", () => {
  expect(beneathNames(new Map([["akasha/one/two/held.ts", "akasha/far/held.ts"]]))).toEqual([
    "one/two/held.ts",
    "two/held.ts",
  ])
  expect(beneathNames(new Map([["akasha/one", "akasha/far/one"]]))).toEqual([])
})

test("a path spelled with no leading dot is resolved against the folder of the file naming it", () => {
  const moved = new Map([["akasha/one/held.ts", "akasha/two/held.ts"]])
  expect(repointedText("akasha/routes.ts", '"one/held.ts"', moved)).toBe('"two/held.ts"')
})

test("a path with no leading dot landing on nothing that moved is left alone", () => {
  const moved = new Map([["akasha/one/held.ts", "akasha/two/held.ts"]])
  expect(repointedText("tools/routes.ts", '"one/held.ts"', moved)).toBe('"one/held.ts"')
})

test("a path spelled whole is left to the whole-name rewriting rather than resolved again", () => {
  const moved = new Map([["akasha/one/held.ts", "akasha/two/held.ts"]])
  expect(repointedText("tools/x.ts", '"akasha/one/held.ts"', moved)).toBe('"akasha/two/held.ts"')
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
  expect(outsideSaid([], [], [], false)[0]).toBe("no further file spelled what moved by its path")
  expect(outsideSaid([LOCK], [], [], true)[0]).toContain(`would be repointed — ${LOCK}`)
  expect(outsideSaid([], [], [], false)[1]).toContain("is left alone")
})

test("a file found by name that no rewriting changed is named whether or not one was", () => {
  expect(alikeSaid([], true)).toEqual([])
  expect(alikeSaid([LOCK], true)[0]).toContain(`judge it — ${LOCK}`)
  expect(outsideSaid([], [], [LOCK], false)[1]).toContain("was left alone")
  expect(outsideSaid([LOCK], [], [LOCK], false)[1]).toContain("was left alone")
})

test("a table naming what moved beneath its own folder is repointed and the answer says so", async () => {
  const root = rebuilt(repoWith({ [TABLE]: TABLE_CODE, [ROUTE]: OTHER }))
  const dry = await move(["--from", ROUTE, "--to", ROUTE_AT, "--dry-run"], givenIn(root))
  expect(dry.refusals).toEqual([])
  expect(told(dry)).toContain(`spelling what moved by its path would be repointed — ${TABLE}`)
  expect(told(dry)).not.toContain("no further file spelled what moved by its path")
  expect(bodyIn(root, TABLE)).toBe(TABLE_CODE)
  const said = await move(["--from", ROUTE, "--to", ROUTE_AT], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, TABLE)).toBe(TABLE_REPOINTED)
})

test("a body carrying a name what moved is also called is named rather than changed", async () => {
  const root = rebuilt(repoWith({ [ALIKE]: ALIKE_CODE, [TARGET]: OTHER }))
  const said = await move(CARRY, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, ALIKE)).toBe(ALIKE_CODE)
  expect(told(said)).toContain(`also called and was left alone — read each and judge it — ${ALIKE}`)
})
