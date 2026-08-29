import { expect, test } from "bun:test"
import { reasonsIn, reExportsIn } from "./no-re-export.check.code.ts"

const ROOT = "/repo"

const AT = "akasha/held.ts"

function given(at: string, body: string) {
  return { root: ROOT, path: at, bytes: new TextEncoder().encode(body) }
}

test("a file exporting only what it declared is let through", () => {
  const body =
    'import { two } from "./two.ts"\n\nexport function one(): number {\n  return two()\n}\n'
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a name declared here and exported in a statement of its own is let through", () => {
  expect(reasonsIn(given(AT, "function one() {}\n\nexport { one }\n"))).toEqual([])
})

test("a name declared here and exported under another name is let through", () => {
  expect(reasonsIn(given(AT, "function one() {}\n\nexport { one as two }\n"))).toEqual([])
})

test("an export straight from its source is refused, naming the line, the name and the source", () => {
  const said = reasonsIn(given(AT, '\nexport { a } from "./b.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`a`")
  expect(said[0]).toContain("`./b.ts`")
})

test("a name imported and then exported under the same name is refused the same", () => {
  const body = 'import { a } from "./b.ts"\n\nexport { a }\n'
  const said = reasonsIn(given(AT, body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("`a`")
  expect(said[0]).toContain("`./b.ts`")
})

test("a name imported and then exported under a new spelling is refused too", () => {
  const body = 'import { a } from "./b.ts"\n\nexport { a as c }\n'
  const said = reasonsIn(given(AT, body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`c`")
})

test("a default import sent on, and a namespace import sent on, are both refused", () => {
  const first = 'import a from "./b.ts"\n\nexport { a }\n'
  expect(reasonsIn(given(AT, first))).toHaveLength(1)
  const second = 'import * as a from "./b.ts"\n\nexport { a }\n'
  expect(reasonsIn(given(AT, second))).toHaveLength(1)
})

test("an import sent on as the default export is refused", () => {
  const body = 'import { a } from "./b.ts"\n\nexport default a\n'
  expect(reasonsIn(given(AT, body))).toHaveLength(1)
})

test("`export * from` is refused as one, and the reason says everything", () => {
  const said = reasonsIn(given(AT, 'export * from "./b.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("everything")
  expect(said[0]).toContain("`./b.ts`")
})

test("`export * as` is refused, and the reason names what it was gathered under", () => {
  const said = reasonsIn(given(AT, 'export * as held from "./b.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`held`")
})

test("a type-only export straight from its source is a re-export", () => {
  expect(reasonsIn(given(AT, 'export type { A } from "./b.ts"\n'))).toHaveLength(1)
  expect(reasonsIn(given(AT, 'export { type A } from "./b.ts"\n'))).toHaveLength(1)
})

test("a type imported and then exported is a re-export", () => {
  const body = 'import type { A } from "./b.ts"\n\nexport type { A }\n'
  expect(reasonsIn(given(AT, body))).toHaveLength(1)
})

test("every name a barrel sends on is reported, one reason each", () => {
  const body = 'export {\n  a,\n  b,\n  c,\n} from "./b.ts"\n'
  const said = reasonsIn(given(AT, body))
  expect(said).toHaveLength(3)
  expect(said[0]).toContain("line 1")
  expect(said[2]).toContain("`c`")
})

test("a comment or a string saying `export * from` fools nothing", () => {
  const body = "const said = 'export * from \"./b.ts\"'\n\nexport { said }\n"
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a file outside the akasha folder is passed over", () => {
  expect(reasonsIn(given("tools/held.ts", 'export * from "./b.ts"\n'))).toEqual([])
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", 'export * from "./b.ts"\n'))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(held)).toEqual([])
})

test("what was found carries the line, the name and the source it came from", () => {
  const found = reExportsIn(AT, 'export * from "./b.ts"\nexport { a } from "./c.ts"\n')
  expect(found).toHaveLength(2)
  expect(found[0]).toEqual({ named: null, line: 1, from: "./b.ts" })
  expect(found[1]).toEqual({ named: "a", line: 2, from: "./c.ts" })
})
