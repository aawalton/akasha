import { expect, test } from "bun:test"
import { parsedAs } from "../../../../../code-system/code-source/code-source.module.code.ts"
import { PROBE_AT } from "../../no-refused-syntax.check.test-fixtures.ts"
import type { Refusal } from "../syntax-rule.page-type.ts"
import { noSwallowedRead } from "./no-swallowed-read.syntax-rule.code.ts"

const WALKING = 'import type { Change } from "../checks-system/judging/judging.module.code.ts"\n'

const APART = 'import { join } from "node:path"\n'

const SWALLOWED =
  "function one(at: string) { try { return readFileSync(at) } catch { return null } }\n"

function over(text: string): readonly Refusal[] {
  return noSwallowedRead({ path: PROBE_AT, source: parsedAs(PROBE_AT, text) })
}

function walking(body: string): readonly Refusal[] {
  return over(WALKING + body)
}

test("a file naming no change is passed over, whatever it swallows", () => {
  expect(over(APART + SWALLOWED)).toEqual([])
})

test("`Judged` names the change as `Change` does", () => {
  const head = 'import type { Judged } from "../checks-system/judging/judging.module.code.ts"\n'
  expect(over(head + SWALLOWED)).toHaveLength(1)
})

test("a read whose failure falls out of the catch is refused", () => {
  const found = walking(SWALLOWED)
  expect(found).toHaveLength(1)
  expect(found[0]?.reason).toContain("rounds up to clean")
})

test("a catch that throws stands", () => {
  const body =
    "function one(l: Change) { try { return readFileSync(l.root) } catch (why) { throw why } }\n"
  expect(walking(body)).toEqual([])
})

test("a catch calling `process.exit` stands", () => {
  const body =
    "function one(l: Change) { try { return readFileSync(l.root) } catch { process.exit(1) } }\n"
  expect(walking(body)).toEqual([])
})

test("a catch calling a function typed `never` stands", () => {
  const body =
    "function gone(why: string): never { throw new Error(why) }\n" +
    'function one(l: Change) { try { return readFileSync(l.root) } catch { gone("no") } }\n'
  expect(walking(body)).toEqual([])
})

test("a catch resuming the walk with `continue` is refused", () => {
  const body =
    "function one(l: Change) { for (const at of l.changed) { try { readFileSync(at) } catch { continue } } }\n"
  const found = walking(body)
  expect(found).toHaveLength(1)
  expect(found[0]?.reason).toContain("`continue`")
})

test("a catch resuming the walk with `break` is refused", () => {
  const body =
    "function one(l: Change) { for (const at of l.changed) { try { readFileSync(at) } catch { break } } }\n"
  expect(walking(body)).toHaveLength(1)
})

test("an empty catch is refused", () => {
  expect(
    walking("function one(l: Change) { try { readFileSync(l.root) } catch {} }\n")
  ).toHaveLength(1)
})

test("a read reached through a function beside it is refused", () => {
  const body =
    "function bytesAt(at: string) { return readFileSync(at) }\n" +
    "function one(l: Change) { try { return bytesAt(l.root) } catch { return null } }\n"
  expect(walking(body)).toHaveLength(1)
})

test("`Bun.file` is a read", () => {
  const body = "function one(l: Change) { try { return Bun.file(l.root) } catch { return null } }\n"
  expect(walking(body)).toHaveLength(1)
})

test("a decoder is a read, that being bytes turned into a body", () => {
  const body =
    'function one(l: Change, bytes: Uint8Array) { try { return new TextDecoder("utf-8", { fatal: true }).decode(bytes) } catch { return null } }\n'
  expect(walking(body)).toHaveLength(1)
})

test("a binding taken from `createRequire` is a read", () => {
  const body =
    "const loadFrom = createRequire(import.meta.url)\n" +
    "function one(l: Change, at: string) { try { return loadFrom(at) } catch { return null } }\n"
  expect(walking(body)).toHaveLength(1)
})

test("a try reading nothing is left alone", () => {
  const body =
    "function one(l: Change) { try { return JSON.parse(l.root) } catch { return null } }\n"
  expect(walking(body)).toEqual([])
})

test("a read with no try at all is left alone", () => {
  expect(walking("function one(l: Change) { return readFileSync(l.root) }\n")).toEqual([])
})

test("the words inside a string literal are no try", () => {
  const body = 'const one = "try { readFileSync(at) } catch { return null }"\n'
  expect(walking(body)).toEqual([])
})

test("the line named is the catch's own", () => {
  const body =
    "const one = 1\n" +
    "function two(l: Change) {\n  try {\n    return readFileSync(l.root)\n  } catch {\n    return null\n  }\n}\n"
  expect(walking(body)[0]?.line).toBe(6)
})

test("two swallows are refused once each", () => {
  const body =
    "function one(l: Change) { try { return readFileSync(l.root) } catch { return null } }\n" +
    "function two(l: Change) { try { return readFileSync(l.root) } catch { return null } }\n"
  expect(walking(body)).toHaveLength(2)
})
