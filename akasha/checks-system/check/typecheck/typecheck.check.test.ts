import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Leaving } from "../../../checks-system/judging.module.code.ts"
import { wholeOf } from "../../checking.module.code.ts"
import { typecheck } from "./typecheck.check.code.ts"

let count = 0

function stage(files: Readonly<Record<string, string>>): string {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-typecheck-${count}-`)
  for (const [at, body] of Object.entries(files)) writeFileSync(`${root}/${at}`, body)
  return root
}

function overAll(root: string, changed: Readonly<Record<string, string>> = {}): Leaving {
  return {
    root,
    changed: Object.keys(changed).map((one) => `${root}/${one}`),
    at: (path) => {
      const named = path.slice(root.length + 1)
      const held = changed[named]
      if (held !== undefined) return Buffer.from(held, "utf8")
      try {
        return require("node:fs").readFileSync(path) as Uint8Array
      } catch {
        return null
      }
    },
  }
}

function only(said: readonly { path: string; reason: string }[], root: string) {
  return said.filter((one) => one.path.startsWith(`${root}/`))
}

test("TypeScript that compiles is judged clean", () => {
  const root = stage({ "one.ts": "export const one: number = 1\n" })
  expect(only(typecheck(wholeOf(overAll(root))), root)).toEqual([])
  rmSync(root, { recursive: true })
})

test("a type that does not hold is a finding against the file holding it, and names the line", () => {
  const root = stage({ "one.ts": "export const one: number = 1\nexport const two: string = one\n" })
  const said = only(typecheck(wholeOf(overAll(root))), root)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${root}/one.ts`)
  expect(said[0]?.reason).toContain("line 2")
  expect(said[0]?.reason).toContain("TS2322")
  rmSync(root, { recursive: true })
})

test("a type is judged across files, so a caller is refused for a callee it no longer fits", () => {
  const root = stage({
    "held.ts": "export function held(one: number): number {\n  return one\n}\n",
    "calls.ts": 'import { held } from "./held.ts"\nexport const one = held("not a number")\n',
  })
  const said = only(typecheck(wholeOf(overAll(root))), root)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${root}/calls.ts`)
  rmSync(root, { recursive: true })
})

test("the tree judged is the one the change would leave, so a fix in hand is seen as landed", () => {
  const root = stage({ "one.ts": "export const one: string = 1\n" })
  const said = only(typecheck(wholeOf(overAll(root, { "one.ts": "export const one: number = 1\n" }))), root)
  expect(said).toEqual([])
  rmSync(root, { recursive: true })
})

test("a change that would break a file it does not touch is still refused", () => {
  const root = stage({
    "held.ts": "export function held(one: number): number {\n  return one\n}\n",
    "calls.ts": 'import { held } from "./held.ts"\nexport const one = held(1)\n',
  })
  const said = only(
    typecheck(wholeOf(overAll(root, { "held.ts": "export function held(one: string): string {\n  return one\n}\n" }))),
    root
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${root}/calls.ts`)
  rmSync(root, { recursive: true })
})

test("an index read without a guard is refused, so the settings are the strict ones", () => {
  const root = stage({
    "one.ts": "export function first(held: readonly string[]): string {\n  return held[0]\n}\n",
  })
  const said = only(typecheck(wholeOf(overAll(root))), root)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("undefined")
  rmSync(root, { recursive: true })
})

test("a tree holding no TypeScript is judged clean without a program being built", () => {
  const root = stage({ "notes.txt": "nothing to compile\n" })
  expect(typecheck(wholeOf(overAll(root)))).toEqual([])
  rmSync(root, { recursive: true })
})
