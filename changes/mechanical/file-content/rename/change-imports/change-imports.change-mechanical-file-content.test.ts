import { expect, test } from "bun:test"
import { ARRIVES, CODE, HOLDER, TARGET } from "@akasha/testing-system/page-holding"
import { gathered } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { bodyOf } from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { changeImports } from "./change-imports.change-mechanical-file-content.code.ts"

const TABLE = "akasha/one/routes.ts"

const ALIAS = "@akasha/two/other"

const TYPED_ROUTE = "akasha/one/routes/api.addons.download.ts"

const TYPED_ROUTE_AT = "akasha/one/routes/addon-parcel/addon-parcel.route.code.ts"

const TYPED_CODE = `import type { Route } from "./+types/api.addons.download"

export const it: Route | null = null
`

const TYPED_FOLLOWED = `import type { Route } from "./+types/addon-parcel.route.code"

export const it: Route | null = null
`

function ranOn(was: string, now: string, text: string, moved: ReadonlyMap<string, string>): Answer {
  return gathered([changeImports(was, now, text, moved)])
}

function bodyIn(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string {
  return bodyOf(ranOn(was, now, text, moved), (path) => (path === now ? text : null))
}

test("a specifier reaching a file that moves in the same act reaches its new path", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const said = bodyIn(HOLDER, HOLDER, CODE, moved)
  expect(said).toContain('from "../four/other.module.code.ts"')
  expect(said).toContain('import ts from "typescript"')
})

test("a body naming nothing that moved is answered as no edit", () => {
  expect(ranOn(HOLDER, HOLDER, CODE, new Map()).edits).toEqual([])
})

test("a body that does not move states a replace rather than a move", () => {
  const said = changeImports(HOLDER, HOLDER, CODE, new Map([[TARGET, ARRIVES]]))

  expect(said.edits).toHaveLength(1)
  expect(said.edits[0]).toMatchObject({ kind: "replace", path: HOLDER })
})

test("the passage a repointed import names is the line rather than the body", () => {
  const said = changeImports(HOLDER, HOLDER, CODE, new Map([[TARGET, ARRIVES]]))
  const one = said.edits[0]

  expect(one?.kind === "replace" && one.contentFrom).toBe(
    'import { other } from "../two/other.module.code.ts"'
  )
})

test("a name that is no specifier is read against the folder of the body naming it", () => {
  const moved = new Map([["akasha/one/two/held.ts", "akasha/one/three/held.ts"]])
  const text = `export const at = "two/held.ts"\n`
  expect(bodyIn(TABLE, TABLE, text, moved)).toBe(`export const at = "three/held.ts"\n`)
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
  expect(bodyIn(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved)).toBe(TYPED_FOLLOWED)
})

test("a body landing elsewhere is answered at the path the carry left it at", () => {
  const moved = new Map([[TYPED_ROUTE, TYPED_ROUTE_AT]])
  const said = ranOn(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved)

  expect(said.edits.map((one) => one.kind)).toEqual(["replace"])
  expect(said.edits[0]).toMatchObject({ kind: "replace", path: TYPED_ROUTE_AT })
})

test("a body moving under the name it has keeps the types specifier it already spells", () => {
  const was = "akasha/one/routes/keep.ts"
  const now = "akasha/one/routes/under/keep.ts"
  const text = `import type { Route } from "./+types/keep"\n`

  const said = changeImports(was, now, text, new Map([[was, now]]))

  expect(said.edits).toEqual([])
})

test("a specifier a manifest names is followed to where the file it reached moved", () => {
  const naming = new Map([[ALIAS, TARGET]])
  const text = `import { other } from "${ALIAS}"\n\nexport const held = other\n`

  const said = changeImports(HOLDER, HOLDER, text, new Map([[TARGET, ARRIVES]]), naming)
  const one = said.edits[0]

  expect(one?.kind === "replace" && one.contentTo).toBe(
    'import { other } from "../four/other.module.code.ts"'
  )
})

test("a name a manifest names is followed only where that name is a specifier", () => {
  const naming = new Map([[ALIAS, TARGET]])
  const text = `export const at = "${ALIAS}"\n`

  const said = changeImports(TABLE, TABLE, text, new Map([[TARGET, ARRIVES]]), naming)

  expect(said.edits).toEqual([])
})

test("a specifier a manifest names reaching nothing that moved is left alone", () => {
  const naming = new Map([[ALIAS, TARGET]])
  const text = `import { other } from "${ALIAS}"\n\nexport const held = other\n`

  const said = changeImports(HOLDER, HOLDER, text, new Map(), naming)

  expect(said.edits).toEqual([])
})
