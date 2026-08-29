import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import ts from "typescript"
import type { Leaving } from "../../judging.module.code.ts"
import { everyIn, foundOf, typecheck } from "./typecheck.check.code.ts"

function staged(files: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-typecheck-"))
  mkdirSync(join(root, "akasha"))
  for (const [at, body] of Object.entries(files)) writeFileSync(join(root, at), body)
  return root
}

function leaving(root: string, over: Readonly<Record<string, string | null>>): Leaving {
  const held = new Map(Object.entries(over))
  return {
    root,
    changed: [...held.keys()].sort(),
    at: (path) => {
      if (held.has(path)) {
        const said = held.get(path)
        return said === undefined || said === null ? null : new TextEncoder().encode(said)
      }
      try {
        return readFileSync(join(root, path))
      } catch {
        return null
      }
    },
  }
}

function over(root: string, path: string, body: string | null) {
  return typecheck(leaving(root, { [path]: body }))
}

test("akasha TypeScript that compiles is judged clean", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  expect(over(root, "akasha/one.ts", "export const one: number = 1\n")).toEqual([])
  rmSync(root, { recursive: true })
})

test("a proposed body whose type does not hold is refused, and names the line", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  const said = over(root, "akasha/one.ts", "export const one: number = 1\nexport const two: string = one\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/one.ts")
  expect(said[0]?.reason).toContain("line 2")
  expect(said[0]?.reason).toContain("TS2322")
  rmSync(root, { recursive: true })
})

test("a proposed body that fixes what stands on disk is judged clean, so the change is what is read", () => {
  const root = staged({
    "akasha/one.ts": "export const one: number = 1\nexport const two: string = one\n",
  })
  expect(over(root, "akasha/one.ts", "export const one: number = 1\n")).toEqual([])
  expect(over(root, "akasha/one.ts", null)).toEqual([])
  rmSync(root, { recursive: true })
})

test("a proposed body that breaks what stands clean on disk is refused, so the change is what is read", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  expect(typecheck(leaving(root, {}))).toEqual([])
  expect(over(root, "akasha/one.ts", "export const one: string = 1\n")).toHaveLength(1)
  expect(typecheck(leaving(root, {}))).toEqual([])
  rmSync(root, { recursive: true })
})

test("a type is judged across files, so a caller is refused for a callee it no longer fits", () => {
  const root = staged({
    "akasha/held.ts": "export function held(one: number): number {\n  return one\n}\n",
    "akasha/calls.ts": 'import { held } from "./held.ts"\nexport const one = held(1)\n',
  })
  const said = over(root, "akasha/calls.ts", 'import { held } from "./held.ts"\nexport const one = held("no")\n')
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  rmSync(root, { recursive: true })
})

test("a change that would break a file it does not touch is refused, and answers at that file", () => {
  const root = staged({
    "akasha/held.ts": "export function held(one: number): number {\n  return one\n}\n",
    "akasha/calls.ts": 'import { held } from "./held.ts"\nexport const one = held(1)\n',
  })
  const said = over(root, "akasha/held.ts", "export function held(one: string): string {\n  return one\n}\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  expect(said[0]?.reason).toContain("does not compile")
  rmSync(root, { recursive: true })
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
  rmSync(root, { recursive: true })
})

test("a file the change takes away answers for none of its own diagnostics", () => {
  const root = staged({
    "akasha/one.ts": "export const one: number = 1\nexport const two: string = one\n",
  })
  expect(over(root, "akasha/one.ts", null)).toEqual([])
  rmSync(root, { recursive: true })
})

test("an export the change takes away breaks the file reading it", () => {
  const root = staged({
    "akasha/held.ts": "export const one = 1\nexport const two = 2\n",
    "akasha/calls.ts": 'import { two } from "./held.ts"\nexport const said = two\n',
  })
  const said = over(root, "akasha/held.ts", "export const one = 1\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/calls.ts")
  rmSync(root, { recursive: true })
})

test("a file the change brings is compiled though no disk holds it", () => {
  const root = staged({ "akasha/one.ts": "export const one: number = 1\n" })
  const said = typecheck(leaving(root, { "akasha/two.ts": "export const two: string = 2\n" }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe("akasha/two.ts")
  rmSync(root, { recursive: true })
})

test("a diagnostic against a file the change did not touch is reported once, however many paths it holds", () => {
  const root = staged({
    "akasha/broken.ts": "export const one: string = 1\n",
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
  rmSync(root, { recursive: true })
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
  rmSync(root, { recursive: true })
})

test("a file that is not TypeScript is passed over, and a file outside the akasha folder is not judged", () => {
  const root = staged({ "akasha/one.ts": "export const one = 1\n" })
  expect(over(root, "akasha/notes.txt", "nothing to compile\n")).toEqual([])
  expect(over(root, "shared/one.ts", "export const one: string = 1\n")).toEqual([])
  rmSync(root, { recursive: true })
})

test("a folder holding no TypeScript is judged clean without a program being built", () => {
  const root = staged({ "akasha/notes.txt": "nothing to compile\n" })
  expect(typecheck(leaving(root, { "akasha/notes.txt": "still nothing\n" }))).toEqual([])
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
  rmSync(root, { recursive: true })
})
