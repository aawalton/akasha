import { expect, test } from "bun:test"
import { ARRIVES, CODE, HOLDER, TARGET } from "@akasha/testing-system/page-holding"
import { gathered, widened } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { changeImports } from "./change-imports.change-mechanical-file-content.code.ts"

const TABLE = "akasha/one/routes.ts"

const TYPED_ROUTE = "akasha/one/routes/api.addons.download.ts"

const TYPED_ROUTE_AT = "akasha/one/routes/addon-parcel/addon-parcel.route.code.ts"

const TYPED_CODE = `import type { Route } from "./+types/api.addons.download"

export const it: Route | null = null
`

const TYPED_FOLLOWED = `import type { Route } from "./+types/addon-parcel.route.code"

export const it: Route | null = null
`

function ranOn(was: string, now: string, text: string, moved: ReadonlyMap<string, string>): Answer {
  const said = widened(changeImports(was, now, text, moved), (path) => (path === was ? text : null))
  return gathered([said])
}

function bodyOf(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string {
  const said = ranOn(was, now, text, moved)
  expect(said.refused).toBe(null)
  expect(said.edits).toHaveLength(1)
  return said.edits[0]?.body ?? ""
}

test("a specifier reaching a file that moves in the same act reaches its new path", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const said = bodyOf(HOLDER, HOLDER, CODE, moved)
  expect(said).toContain('from "../four/other.module.code.ts"')
  expect(said).toContain('import ts from "typescript"')
})

test("a body naming nothing that moved is answered as no edit", () => {
  expect(ranOn(HOLDER, HOLDER, CODE, new Map()).edits).toEqual([])
})

test("a body that does not move states a replace rather than a move", () => {
  const said = changeImports(HOLDER, HOLDER, CODE, new Map([[TARGET, ARRIVES]]))

  expect(said.edits).toHaveLength(1)
  expect(said.edits[0]).toMatchObject({ kind: "replace", path: HOLDER, contentFrom: CODE })
})

test("a name that is no specifier is read against the folder of the body naming it", () => {
  const moved = new Map([["akasha/one/two/held.ts", "akasha/one/three/held.ts"]])
  const text = `export const at = "two/held.ts"\n`
  expect(bodyOf(TABLE, TABLE, text, moved)).toBe(`export const at = "three/held.ts"\n`)
})

test("a name landing on nothing that moved, and one holding no slash, are left alone", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const text = `export const said = ["two/other.module.code.ts", "other.module.code.ts"]\n`
  expect(ranOn(TABLE, TABLE, text, moved).edits).toEqual([])
})

test("a name a body imports is read as a package however that name would resolve", () => {
  const moved = new Map([["akasha/one/two/other.module.code.ts", "akasha/one/three/held.ts"]])
  const text = `import { other } from "two/other.module.code.ts"\n\nexport const held = other\n`
  expect(ranOn(HOLDER, HOLDER, text, moved).edits).toEqual([])
})

test("a body's import of its own generated types follows that body's folder and name", () => {
  const moved = new Map([[TYPED_ROUTE, TYPED_ROUTE_AT]])
  expect(bodyOf(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved)).toBe(TYPED_FOLLOWED)
})

test("a body landing elsewhere is answered as one move rather than as a write and a removal", () => {
  const moved = new Map([[TYPED_ROUTE, TYPED_ROUTE_AT]])
  const said = ranOn(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved)

  expect(said.edits).toHaveLength(1)
  expect(said.edits[0]?.from).toBe(TYPED_ROUTE)
  expect(said.edits[0]?.path).toBe(TYPED_ROUTE_AT)
  expect(said.edits[0]?.was).toBe(TYPED_CODE)
})

test("a body moving under the name it has keeps the types specifier it already spells", () => {
  const was = "akasha/one/routes/keep.ts"
  const now = "akasha/one/routes/under/keep.ts"
  const text = `import type { Route } from "./+types/keep"\n`
  expect(bodyOf(was, now, text, new Map([[was, now]]))).toBe(text)
})

test("a move whose body is left alone states the two paths and no body", () => {
  const was = "akasha/one/routes/keep.ts"
  const now = "akasha/one/routes/under/keep.ts"
  const text = `import type { Route } from "./+types/keep"\n`

  const said = changeImports(was, now, text, new Map([[was, now]]))

  expect(said.edits).toEqual([{ kind: "move", pathFrom: was, pathTo: now }])
})
