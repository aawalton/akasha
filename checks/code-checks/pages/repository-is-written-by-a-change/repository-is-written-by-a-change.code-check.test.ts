import { expect, test } from "bun:test"
import { reasonsIn } from "./repository-is-written-by-a-change.code-check.code.ts"

const AT = "commands/pages/one/one.command.code.ts"

function only(text: string): readonly string[] {
  return reasonsIn(AT, text)
}

test("a TypeScript file written under a root taken from the root module is refused", () => {
  const said = only(
    'import { writeFile } from "node:fs/promises"\n' +
      'import { join, resolve } from "node:path"\n' +
      'import { codeRoot } from "@akasha/pages/code-root"\n' +
      "export async function one(): Promise<void> {\n" +
      '  const here = resolve(codeRoot(), "a")\n' +
      '  await writeFile(join(here, "b.ts"), "")\n' +
      "}\n"
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 6")
})

test("a root handed in as `root` is the checkout root", () => {
  const said = only(
    'import { writeFileSync } from "node:fs"\n' +
      'import { join } from "node:path"\n' +
      "export function one(given: { root: string }): void {\n" +
      '  writeFileSync(join(given.root, "a/b.seat.ts"), "")\n' +
      "}\n"
  )
  expect(said).toHaveLength(1)
})

test("a directory made under the root is no source file", () => {
  expect(
    only(
      'import { mkdirSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(root: string): void {\n" +
        '  mkdirSync(join(root, "a/b"), { recursive: true })\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a file under the root that is no TypeScript is let through", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(root: string): void {\n" +
        '  writeFileSync(join(root, "a/b.json"), "")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a TypeScript file written outside the checkout is let through", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        "export function one(): void {\n" +
        '  writeFileSync("/elsewhere/a.ts", "")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a write reached through a namespace taken from `node:fs` is seen", () => {
  expect(
    only(
      'import * as fs from "node:fs"\n' +
        "export function one(root: string): void {\n" +
        '  fs.writeFileSync(`${root}/a.ts`, "")\n' +
        "}\n"
    )
  ).toHaveLength(1)
})

test("`Bun.write` is a write too", () => {
  expect(
    only(
      'import { join } from "node:path"\n' +
        "export async function one(root: string): Promise<void> {\n" +
        '  await Bun.write(join(root, "a.ts"), "")\n' +
        "}\n"
    )
  ).toHaveLength(1)
})

test("a rename is judged on the path it leaves", () => {
  expect(
    only(
      'import { renameSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(root: string): void {\n" +
        '  renameSync(join(root, "a.ts"), "/elsewhere/a.ts")\n' +
        "}\n"
    )
  ).toHaveLength(1)
})

test("the path a copy reads is no destination", () => {
  expect(
    only(
      'import { copyFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(root: string): void {\n" +
        '  copyFileSync(join(root, "a.ts"), "/elsewhere/a.ts")\n' +
        "}\n"
    )
  ).toEqual([])
})

test("a body taking no write from the file system is let through", () => {
  expect(only('import { join } from "node:path"\nexport const a = join("b", "c.ts")\n')).toEqual([])
})

test("each write is named on its own", () => {
  expect(
    only(
      'import { writeFileSync } from "node:fs"\n' +
        'import { join } from "node:path"\n' +
        "export function one(root: string): void {\n" +
        '  writeFileSync(join(root, "a.ts"), "")\n' +
        '  writeFileSync(join(root, "b.tsx"), "")\n' +
        "}\n"
    )
  ).toHaveLength(2)
})
