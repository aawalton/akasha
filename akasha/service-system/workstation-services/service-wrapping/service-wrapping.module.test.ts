import { expect, test } from "bun:test"
import { commandIn, entryIn, namedIn, unparsedIn } from "./service-wrapping.module.code.ts"

const ROOT = "/home/one/repos/akasha"

test("a code file that will not parse is waited on", () => {
  expect(unparsedIn([`${ROOT}/a.ts`, `${ROOT}/b.tsx`, `${ROOT}/c.mts`, `${ROOT}/d.cts`])).toEqual([
    `${ROOT}/a.ts`,
    `${ROOT}/b.tsx`,
    `${ROOT}/c.mts`,
    `${ROOT}/d.cts`,
  ])
})

test("a file that is not code and will not parse is waited on by nothing", () => {
  expect(unparsedIn([`${ROOT}/a.json`, `${ROOT}/b.md`, `${ROOT}/c.css`, `${ROOT}/d.txt`])).toEqual(
    []
  )
})

test("a JSON file beside a code file leaves only the code file waited on", () => {
  expect(unparsedIn([`${ROOT}/a.json`, `${ROOT}/b.ts`])).toEqual([`${ROOT}/b.ts`])
})

test("the command is what stands after the first double dash", () => {
  expect(commandIn(["--also", "x", "--", "bun", "a.ts"])).toEqual(["bun", "a.ts"])
})

test("a call naming no double dash is taken whole as the command", () => {
  expect(commandIn(["bun", "a.ts"])).toEqual(["bun", "a.ts"])
})

test("a double dash with nothing after it is a command of nothing", () => {
  expect(commandIn(["--"])).toEqual([])
})

test("the entry followed is the first argument naming a TypeScript file", () => {
  expect(entryIn(["bun", "run", "services/a.ts", "b.ts"])).toBe("services/a.ts")
})

test("a command naming no TypeScript file has no entry to follow", () => {
  expect(entryIn(["/usr/bin/node-exporter", "--web.listen-address=:9100"])).toBe(null)
})

test("what moved is said by repository-relative path", () => {
  expect(namedIn([`${ROOT}/a.ts`, `${ROOT}/b.ts`], ROOT)).toBe("a.ts, b.ts")
})

test("more than five files that moved are counted rather than all named", () => {
  const many = ["a", "b", "c", "d", "e", "f", "g"].map((one) => `${ROOT}/${one}.ts`)
  expect(namedIn(many, ROOT)).toBe("a.ts, b.ts, c.ts, d.ts, e.ts and 2 more")
})
