import { expect, test } from "bun:test"
import {
  reExportsIn,
  refusalsIn,
} from "akasha/checks/code-checks/pages/no-re-export/no-re-export.code-check.decision.code.ts"
import { AT } from "akasha/checks/code-checks/pages/no-re-export/no-re-export.code-check.decision.test-fixtures.ts"

test("a file exporting only what it declared is let through", () => {
  const body =
    'import { two } from "./two.ts"\n\nexport function one(): number {\n  return two()\n}\n'
  expect(refusalsIn(AT, body)).toEqual([])
})

test("a name declared here and exported in a statement of its own is let through", () => {
  expect(refusalsIn(AT, "function one() {}\n\nexport { one }\n")).toEqual([])
})

test("a name declared here and exported under another name is let through", () => {
  expect(refusalsIn(AT, "function one() {}\n\nexport { one as two }\n")).toEqual([])
})

test("an export straight from its source is refused, naming the line, the name and the source", () => {
  const said = refusalsIn(AT, '\nexport { a } from "./b.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`a`")
  expect(said[0]).toContain("`./b.ts`")
})

test("a name imported and then exported under the same name is refused the same", () => {
  const body = 'import { a } from "./b.ts"\n\nexport { a }\n'
  const said = refusalsIn(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("`a`")
  expect(said[0]).toContain("`./b.ts`")
})

test("a name imported and then exported under a new spelling is refused too", () => {
  const body = 'import { a } from "./b.ts"\n\nexport { a as c }\n'
  const said = refusalsIn(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`c`")
})

test("a default import sent on, and a namespace import sent on, are both refused", () => {
  const first = 'import a from "./b.ts"\n\nexport { a }\n'
  expect(refusalsIn(AT, first)).toHaveLength(1)
  const second = 'import * as a from "./b.ts"\n\nexport { a }\n'
  expect(refusalsIn(AT, second)).toHaveLength(1)
})

test("an import sent on as the default export is refused", () => {
  const body = 'import { a } from "./b.ts"\n\nexport default a\n'
  expect(refusalsIn(AT, body)).toHaveLength(1)
})

test("`export * from` is refused as one, and the reason says everything", () => {
  const said = refusalsIn(AT, 'export * from "./b.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("everything")
  expect(said[0]).toContain("`./b.ts`")
})

test("`export * as` is refused, and the reason names what it was gathered under", () => {
  const said = refusalsIn(AT, 'export * as held from "./b.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`held`")
})

test("a type-only export straight from its source is a re-export", () => {
  expect(refusalsIn(AT, 'export type { A } from "./b.ts"\n')).toHaveLength(1)
  expect(refusalsIn(AT, 'export { type A } from "./b.ts"\n')).toHaveLength(1)
})

test("a type imported and then exported is a re-export", () => {
  const body = 'import type { A } from "./b.ts"\n\nexport type { A }\n'
  expect(refusalsIn(AT, body)).toHaveLength(1)
})

test("every name a barrel sends on is reported, one reason each", () => {
  const body = 'export {\n  a,\n  b,\n  c,\n} from "./b.ts"\n'
  const said = refusalsIn(AT, body)
  expect(said).toHaveLength(3)
  expect(said[0]).toContain("line 1")
  expect(said[2]).toContain("`c`")
})

test("a comment or a string saying `export * from` fools nothing", () => {
  const body = "const said = 'export * from \"./b.ts\"'\n\nexport { said }\n"
  expect(refusalsIn(AT, body)).toEqual([])
})

test("what was found carries the line, the name and the source it came from", () => {
  const found = reExportsIn(AT, 'export * from "./b.ts"\nexport { a } from "./c.ts"\n')
  expect(found).toHaveLength(2)
  expect(found[0]).toEqual({ named: null, line: 1, from: "./b.ts" })
  expect(found[1]).toEqual({ named: "a", line: 2, from: "./c.ts" })
})

test("a re-export inside a module declaration is refused like one at the top", () => {
  const said = refusalsIn(AT, 'declare module "x" {\n  export { a } from "./b.ts"\n}\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`a`")
})

test("an import and a re-export both below the top are joined up", () => {
  const body = 'declare module "x" {\n  import { a } from "./b.ts"\n  export { a }\n}\n'
  const said = refusalsIn(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("./b.ts")
})

test("a name declared inside a declaration and exported there is let through", () => {
  const body = 'declare module "x" {\n  const a: number\n  export { a }\n}\n'
  expect(refusalsIn(AT, body)).toEqual([])
})
