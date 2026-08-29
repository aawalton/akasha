import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { everyIn, foundIn, typecheck } from "./typecheck.check.code.ts"

function staged(files: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-typecheck-"))
  mkdirSync(join(root, "akasha"))
  for (const [at, body] of Object.entries(files)) writeFileSync(join(root, at), body)
  return root
}

function over(root: string, path: string) {
  return typecheck({ root, path })
}

test("akasha TypeScript that compiles is judged clean", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  expect(over(root, "akasha/one.ts")).toEqual([])
  rmSync(root, { recursive: true })
})

test("a type that does not hold is a finding against the file holding it, and names the line", () => {
  const root = staged({
    "akasha/one.ts": "export const one: number = 1\nexport const two: string = one\n",
  })
  const said = over(root, "akasha/one.ts")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("TS2322")
  rmSync(root, { recursive: true })
})

test("a type is judged across files, so a caller is refused for a callee it no longer fits", () => {
  const root = staged({
    "akasha/held.ts": "export function held(one: number): number {\n  return one\n}\n",
    "akasha/calls.ts":
      'import { held } from "./held.ts"\nexport const one = held("not a number")\n',
  })
  expect(over(root, "akasha/calls.ts")).toHaveLength(1)
  rmSync(root, { recursive: true })
})

test("a change that would break a file it does not touch is still refused, and names that file", () => {
  const root = staged({
    "akasha/held.ts": "export function held(one: string): string {\n  return one\n}\n",
    "akasha/calls.ts": 'import { held } from "./held.ts"\nexport const one = held(1)\n',
  })
  const said = over(root, "akasha/held.ts")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`akasha/calls.ts`")
  expect(said[0]).toContain("does not compile")
  rmSync(root, { recursive: true })
})

test("an index read without a guard is refused, so the settings are the strict ones", () => {
  const root = staged({
    "akasha/one.ts": "export function first(held: readonly string[]): string {\n  return held[0]\n}\n",
  })
  const said = over(root, "akasha/one.ts")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("undefined")
  rmSync(root, { recursive: true })
})

test("a file that is not TypeScript is passed over without the compiler being run", () => {
  const root = staged({ "akasha/one.ts": "export const one: string = 1\n" })
  expect(over(root, "akasha/notes.txt")).toEqual([])
  rmSync(root, { recursive: true })
})

test("a file outside the akasha folder is not this check's business", () => {
  const root = staged({ "akasha/one.ts": "export const one: string = 1\n" })
  expect(over(root, "shared/one.ts")).toEqual([])
  rmSync(root, { recursive: true })
})

test("a folder holding no TypeScript is judged clean without a compiler being run", () => {
  const root = staged({ "akasha/notes.txt": "nothing to compile\n" })
  expect(over(root, "akasha/held.ts")).toEqual([])
  rmSync(root, { recursive: true })
})

test("every TypeScript file under the akasha folder is compiled, and nothing else is", () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n", "akasha/notes.txt": "no\n" })
  mkdirSync(join(root, "akasha/deep"))
  mkdirSync(join(root, "shared"))
  writeFileSync(join(root, "akasha/deep/two.ts"), "export const two = 2\n")
  writeFileSync(join(root, "shared/three.ts"), "export const three = 3\n")
  expect(everyIn(root)).toEqual(["akasha/deep/two.ts", "akasha/one.ts"])
  rmSync(root, { recursive: true })
})

test("a diagnostic naming no file is thrown, because the compiler could not run", () => {
  expect(() => foundIn("error TS5023: Unknown compiler option '--nope'.\n")).toThrow()
})

test("a diagnostic carried over more than one line is one finding", () => {
  const said = foundIn(
    "akasha/one.ts(2,7): error TS2322: Type 'A' is not assignable to type 'B'.\n  Type 'C' is missing.\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("Type 'C' is missing.")
})
