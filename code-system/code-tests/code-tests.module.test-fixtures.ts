import { RUNNING } from "akasha/code-system/code-tests/code-tests.module.code.ts"

export const PASSES =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

export const FAILS =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

export const MARKED =
  'import { expect, test } from "bun:test"\n' +
  `test("one", () => { expect(process.env["${RUNNING}"]).toBe("1") })\n`

export const BURNS =
  'import { test } from "bun:test"\n' +
  'test("one", () => { const until = Bun.nanoseconds() + 2e9\n' +
  "  while (Bun.nanoseconds() < until) {} })\n"

export const SETS = "globalThis.held = true\n"

export const NEEDS =
  'import { expect, test } from "bun:test"\n' +
  'test("one", () => { expect(globalThis.held).toBe(true) })\n'
