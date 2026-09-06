import { afterAll, expect, test } from "bun:test"
import { move } from "../../../../command-system/commands/move/move.command.code.ts"
import {
  ARRIVES,
  bodyIn,
  CODE,
  givenIn,
  HOLDER,
  rebuilt,
  repoWith,
  scratch,
  TARGET,
} from "../../../../command-system/commands/move/move.command.test-fixtures.ts"
import { repointed } from "./repoint-imports.module.code.ts"

afterAll(scratch.sweep)

const TABLE = "akasha/one/routes.ts"

const TYPED_ROUTE = "akasha/one/routes/api.addons.download.ts"

const TYPED_ROUTE_AT = "akasha/one/routes/addon-parcel/addon-parcel.route.code.ts"

const TYPED_CODE = `import type { Route } from "./+types/api.addons.download"

export const it: Route | null = null
`

const TYPED_REPOINTED = `import type { Route } from "./+types/addon-parcel.route.code"

export const it: Route | null = null
`

test("a specifier reaching a file that moves in the same act reaches its new path", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const said = repointed(HOLDER, HOLDER, CODE, moved)
  expect(said).toContain('from "../four/other.module.code.ts"')
  expect(said).toContain('import ts from "typescript"')
})

test("a body naming nothing that moved comes back as it stands", () => {
  expect(repointed(HOLDER, HOLDER, CODE, new Map())).toBe(CODE)
})

test("a name that is no specifier is read against the folder of the body naming it", () => {
  const moved = new Map([["akasha/one/two/held.ts", "akasha/one/three/held.ts"]])
  const text = `export const at = "two/held.ts"\n`
  expect(repointed(TABLE, TABLE, text, moved)).toBe(`export const at = "three/held.ts"\n`)
})

test("a name landing on nothing that moved, and one holding no slash, are left alone", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const text = `export const said = ["two/other.module.code.ts", "other.module.code.ts"]\n`
  expect(repointed(TABLE, TABLE, text, moved)).toBe(text)
})

test("a name a body imports is read as a package however that name would resolve", () => {
  const moved = new Map([["akasha/one/two/other.module.code.ts", "akasha/one/three/held.ts"]])
  const text = `import { other } from "two/other.module.code.ts"\n\nexport const held = other\n`
  expect(repointed(HOLDER, HOLDER, text, moved)).toBe(text)
})

test("a body's import of its own generated types follows that body's folder and name", () => {
  const moved = new Map([[TYPED_ROUTE, TYPED_ROUTE_AT]])
  expect(repointed(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved)).toBe(TYPED_REPOINTED)
})

test("a body moving under the name it has keeps the types specifier it already spells", () => {
  const was = "akasha/one/routes/keep.ts"
  const now = "akasha/one/routes/under/keep.ts"
  const text = `import type { Route } from "./+types/keep"\n`
  expect(repointed(was, now, text, new Map([[was, now]]))).toBe(text)
})

test("a move leaves a route naming the generated types of where that route arrived", async () => {
  const root = rebuilt(repoWith({ [TYPED_ROUTE]: TYPED_CODE }))
  expect(bodyIn(root, TYPED_ROUTE)).toBe(TYPED_CODE)
  const said = await move(["--from", TYPED_ROUTE, "--to", TYPED_ROUTE_AT], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, TYPED_ROUTE_AT)).toBe(TYPED_REPOINTED)
})
