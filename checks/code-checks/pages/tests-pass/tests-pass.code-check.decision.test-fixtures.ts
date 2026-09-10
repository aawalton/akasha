import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { RUNNING } from "@akasha/code/code-tests"
import { noPathsFiled, pathFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"

export const PASSES =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

export const FAILS =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

export const HOLDS = "export const held = 1\n"

export const BREAKS = "export const held = 2\n"

export const READS =
  'import { expect, test } from "bun:test"\n' +
  'import { held } from "./one.module.code.ts"\n' +
  'test("one", () => { expect(held).toBe(1) })\n'

export const CODE_AT = "akasha/one.module.code.ts"

export const TEST_AT = "akasha/one.module.test.ts"

const HELD_ID = "01a05fd0-1c4a-7000-8f3b-6a1d4e2c9b70"

export const scratch = scratchWorld()

export function repo(files: Record<string, string>): string {
  const root = realpathSync(scratch.rootFor("tests-pass-"))
  noPathsFiled(root)
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
    pathFiled(root, name, [{ path: name, id: HELD_ID }])
  }
  return root
}

export function tracked(files: Record<string, string>): string {
  const root = repo(files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}

export function withoutGuard<T>(run: () => T): T {
  const held = process.env[RUNNING]
  delete process.env[RUNNING]
  try {
    return run()
  } finally {
    if (held !== undefined) process.env[RUNNING] = held
  }
}
