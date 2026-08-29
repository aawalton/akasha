import { afterAll, expect, test } from "bun:test"
import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import ts from "typescript"
import { foundOf, reachedBy, typecheck } from "./typecheck.check.code.ts"
import { IMPORTS_AT, leaving, over, scratch, staged } from "./typecheck.check.test-fixtures.ts"

afterAll(scratch.sweep)

test("akasha TypeScript that compiles is judged clean", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  expect(over(root, "akasha/one.ts", "export const one: number = 1\n")).toEqual([])
})

test("a proposed body whose type does not hold is refused, and names the line", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  const said = over(
    root,
    "akasha/one.ts",
    "export const one: number = 1\nexport const two: string = one\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/one.ts")
  expect(said[0]?.reason).toContain("line 2")
  expect(said[0]?.reason).toContain("TS2322")
})

test("a proposed body that fixes what stands on disk is judged clean, so the change is what is read", () => {
  const root = staged({
    "akasha/one.ts": "export const one: number = 1\nexport const two: string = one\n",
  })
  expect(over(root, "akasha/one.ts", "export const one: number = 1\n")).toEqual([])
  expect(over(root, "akasha/one.ts", null)).toEqual([])
})

test("a proposed body that breaks what stands clean on disk is refused, so the change is what is read", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  expect(typecheck(leaving(root, {}))).toEqual([])
  expect(over(root, "akasha/one.ts", "export const one: string = 1\n")).toHaveLength(1)
  expect(typecheck(leaving(root, {}))).toEqual([])
})

test("a type is judged across files, so a caller is refused for a callee it no longer fits", () => {
  const root = staged({
    "akasha/held.ts": "export function held(one: number): number {\n  return one\n}\n",
    "akasha/calls.ts": 'import { held } from "./held.ts"\nexport const one = held(1)\n',
  })
  const said = over(
    root,
    "akasha/calls.ts",
    'import { held } from "./held.ts"\nexport const one = held("no")\n'
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
})

test("a change that would break a file it does not touch is refused, and answers at that file", () => {
  const root = staged({
    "akasha/held.ts": "export function held(one: number): number {\n  return one\n}\n",
    "akasha/calls.ts": 'import { held } from "./held.ts"\nexport const one = held(1)\n',
  })
  const said = over(
    root,
    "akasha/held.ts",
    "export function held(one: string): string {\n  return one\n}\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  expect(said[0]?.reason).toContain("does not compile")
})

test("a file the change takes away is gone for the compiler, so a file still importing it is refused", () => {
  const root = staged({
    "akasha/held.ts": "export function held(one: number): number {\n  return one\n}\n",
    "akasha/calls.ts": 'import { held } from "./held.ts"\nexport const one = held(1)\n',
  })
  const said = over(root, "akasha/held.ts", null)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  expect(said[0]?.reason).toContain("TS2307")
})

test("a file the change takes away answers for none of its own diagnostics", () => {
  const root = staged({
    "akasha/one.ts": "export const one: number = 1\nexport const two: string = one\n",
  })
  expect(over(root, "akasha/one.ts", null)).toEqual([])
})

test("an export the change takes away breaks the file reading it", () => {
  const root = staged({
    "akasha/held.ts": "export const one = 1\nexport const two = 2\n",
    "akasha/calls.ts": 'import { two } from "./held.ts"\nexport const said = two\n',
  })
  const said = over(root, "akasha/held.ts", "export const one = 1\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
})

test("a file the change brings is compiled though no disk holds it", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  const said = typecheck(leaving(root, { "akasha/two.ts": "export const two: string = 2\n" }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/two.ts")
})

test("a diagnostic against a file the change did not touch is reported once, however many paths it holds", () => {
  const root = staged({
    "akasha/broken.ts":
      'import { a } from "./a.ts"\nimport { b } from "./b.ts"\nimport { c } from "./c.ts"\nexport const one: string = a + b + c\n',
    "akasha/a.ts": "export const a = 1\n",
    "akasha/b.ts": "export const b = 2\n",
    "akasha/c.ts": "export const c = 3\n",
  })
  const said = typecheck(
    leaving(root, {
      "akasha/a.ts": "export const a = 10\n",
      "akasha/b.ts": "export const b = 20\n",
      "akasha/c.ts": "export const c = 30\n",
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/broken.ts")
})

test("an index read without a guard is refused, so the settings are the strict ones", () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  const said = over(
    root,
    "akasha/one.ts",
    "export function first(held: readonly string[]): string {\n  return held[0]\n}\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("undefined")
})

test("a file that is not TypeScript is passed over, and a file outside the akasha folder is not judged", () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  expect(over(root, "akasha/notes.txt", "nothing to compile\n")).toEqual([])
  expect(over(root, "shared/one.ts", "export const one: string = 1\n")).toEqual([])
})

test("a folder holding no TypeScript is judged clean without a program being built", () => {
  const root = staged({ "akasha/notes.txt": "nothing to compile\n" })
  expect(typecheck(leaving(root, { "akasha/notes.txt": "still nothing\n" }))).toEqual([])
})

test("the files compiled are the change and everything importing it, however far", () => {
  const root = staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/deep/two.ts": 'import { one } from "../one.ts"\nexport const two = one\n',
    "akasha/deep/three.ts": 'import { two } from "./two.ts"\nexport const three = two\n',
    "akasha/apart.ts": "export const apart = 1\n",
  })
  expect(reachedBy(leaving(root, { "akasha/one.ts": "export const one = 2\n" }))).toEqual([
    "akasha/deep/three.ts",
    "akasha/deep/two.ts",
    "akasha/one.ts",
  ])
  expect(reachedBy(leaving(root, { "akasha/apart.ts": "export const apart = 2\n" }))).toEqual([
    "akasha/apart.ts",
  ])
})

test("a file nothing in the change reaches is not compiled, so its standing errors are not this change's", () => {
  const root = staged({
    "akasha/broken.ts": "export const one: string = 1\n",
    "akasha/apart.ts": "export const apart = 1\n",
  })
  expect(typecheck(leaving(root, { "akasha/apart.ts": "export const apart = 2\n" }))).toEqual([])
})

test("a file outside the akasha folder never becomes a root, however the index names it", () => {
  const root = staged({
    "akasha/one.ts": "export const one = 1\n",
    "shared/two.ts": 'import { one } from "../akasha/one.ts"\nexport const two = one\n',
  })
  expect(reachedBy(leaving(root, { "akasha/one.ts": "export const one = 2\n" }))).toEqual([
    "akasha/one.ts",
  ])
})

test("an index that is not there is refused, because an absent graph is not a graph naming no importer", () => {
  const root = staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/two.ts": 'import { one } from "./one.ts"\nexport const two: string = one\n',
  })
  rmSync(join(root, ".git"), { recursive: true })
  expect(() => typecheck(leaving(root, { "akasha/one.ts": "export const one = 2\n" }))).toThrow(
    IMPORTS_AT
  )
})

test("an index standing and naming no importer is an answer, so the change alone is compiled", () => {
  const root = staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/two.ts": "export const two = 2\n",
  })
  expect(reachedBy(leaving(root, { "akasha/one.ts": "export const one = 2\n" }))).toEqual([
    "akasha/one.ts",
  ])
})

test("a change naming no TypeScript under the akasha folder asks the index nothing", () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  rmSync(join(root, ".git"), { recursive: true })
  expect(typecheck(leaving(root, { "akasha/notes.txt": "nothing to compile\n" }))).toEqual([])
})

test("a file whole at base and deleted from the worktree alone still answers for its errors", () => {
  const root = staged({
    "akasha/a.ts": "export const one: number = 1\n",
    "akasha/b.ts": 'import { one } from "./a.ts"\nexport const two: string = one\n',
  })
  const held = readFileSync(join(root, "akasha/b.ts"), "utf8")
  const changed = { "akasha/a.ts": "export const one: number = 1\n" }
  const standing = typecheck(leaving(root, changed))
  rmSync(join(root, "akasha/b.ts"))
  const gone = typecheck(leaving(root, changed, { "akasha/b.ts": held }))
  expect(standing).toHaveLength(1)
  expect(standing[0]?.path).toBe("akasha/b.ts")
  expect(gone).toEqual(standing)
})

test("a diagnostic naming no file is thrown, because nothing could be kept against it", () => {
  const said: ts.Diagnostic = {
    category: ts.DiagnosticCategory.Error,
    code: 5023,
    file: undefined,
    start: undefined,
    length: undefined,
    messageText: "Unknown compiler option.",
  }
  expect(() => foundOf("/at", said)).toThrow()
})

test("a diagnostic carried in a chain is one reason", () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  const said = over(
    root,
    "akasha/one.ts",
    "type A = { a: number }\ntype B = { a: number; b: number }\nexport const one: B = { a: 1 } as A\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("missing")
})
