import { expect, test } from "bun:test"
import {
  approvedParseRoutes,
  isExempt,
  reasonsFor,
} from "./no-unparsed-boundary-read.code-check.decision.code.ts"
import { AT, READ_AND_USED } from "./no-unparsed-boundary-read.code-check.decision.test-fixtures.ts"

test("a file reading across no boundary is let through", () => {
  expect(reasonsFor(AT, "export function one(): number {\n  return 1\n}\n")).toEqual([])
})

test("a `JSON.parse` whose value is used unparsed is refused, and the line is named", () => {
  const said = reasonsFor(AT, READ_AND_USED)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("json-parse")
})

test("a validator's parse of that value in the same block lets it through", () => {
  const body =
    "function one(text: string): undefined {\n  const held = JSON.parse(text)\n" +
    "  use(Held.parse(held))\n}\n"
  expect(reasonsFor(AT, body)).toEqual([])
})

test("a `safeParse` of that value lets it through too", () => {
  const body =
    "function one(text: string): undefined {\n  const held = JSON.parse(text)\n" +
    "  use(Held.safeParse(held))\n}\n"
  expect(reasonsFor(AT, body)).toEqual([])
})

test("a call to a `parseSomething` helper lets it through", () => {
  const body =
    "function one(text: string): undefined {\n  const held = JSON.parse(text)\n" +
    "  use(parseHeld(held))\n}\n"
  expect(reasonsFor(AT, body)).toEqual([])
})

test("a bare helper the rule names lets the read through where the read is its argument", () => {
  const body = "function one(): undefined {\n  use(requireEnv(process.env.HELD))\n}\n"
  expect(reasonsFor(AT, body)).toEqual([])
})

test("a value used unparsed first is refused though a parse comes later", () => {
  const body =
    "function one(text: string): undefined {\n  const held = JSON.parse(text)\n" +
    "  use(held)\n  Held.parse(held)\n}\n"
  expect(reasonsFor(AT, body)).toHaveLength(1)
})

test("a read of `process.env` used unparsed is refused", () => {
  const said = reasonsFor(AT, "const held = process.env.HELD\nuse(held)\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("process-env")
})

test("a write to `process.env` is no read and is let through", () => {
  expect(reasonsFor(AT, 'process.env.HELD = "one"\n')).toEqual([])
})

test("a delete of a key under `process.env` is no read either", () => {
  expect(reasonsFor(AT, "delete process.env.HELD\n")).toEqual([])
})

test("a regular expression capture used unparsed is refused", () => {
  const body =
    "function one(text: string): undefined {\n  const held = /a/.exec(text)\n  use(held)\n}\n"
  const said = reasonsFor(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("regex-capture")
})

test("a read of a file through Bun used unparsed is refused past the await", () => {
  const body =
    "async function one(at: string): Promise<undefined> {\n" +
    "  const held = await Bun.file(at).text()\n  use(held)\n}\n"
  const said = reasonsFor(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("bun-file-read")
})

test("a file under a `__fixtures__` segment is passed over", () => {
  expect(reasonsFor("checks/__fixtures__/held.ts", READ_AND_USED)).toEqual([])
  expect(isExempt("checks/__fixtures__/held.ts")).toBe(true)
})

test("a file under a `generated` segment is passed over", () => {
  expect(reasonsFor("checks/generated/held.ts", READ_AND_USED)).toEqual([])
})

test("a declarations file is passed over", () => {
  expect(reasonsFor("checks/held.d.ts", READ_AND_USED)).toEqual([])
  expect(isExempt("checks/held.d.ts")).toBe(true)
})

test("a machine-written file named `.generated.ts` is passed over", () => {
  expect(reasonsFor("checks/held.generated.ts", READ_AND_USED)).toEqual([])
  expect(isExempt("checks/held.generated.tsx")).toBe(true)
})

test("a path holding neither a named segment nor a named ending is judged", () => {
  expect(isExempt(AT)).toBe(false)
})

test("the routes a refusal names hold the helpers and the shape of the helper name", () => {
  const said = approvedParseRoutes()
  expect(said).toContain("requireEnv")
  expect(said).toContain("^parse[A-Z]")
})
