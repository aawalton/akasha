import { RUNNING } from "akasha/code/tests/code-tests.module.code.ts"
import { AKASHA, rootEnvName } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"

export const PASSES =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

export const FAILS =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

export const MARKED =
  'import { expect, test } from "bun:test"\n' +
  `test("one", () => { expect(process.env["${RUNNING}"]).toBe("1") })\n`

export const ROOTED =
  'import { expect, test } from "bun:test"\n' +
  'import { readFileSync } from "node:fs"\n' +
  'import { join } from "node:path"\n' +
  `test("one", () => { const root = process.env["${rootEnvName(AKASHA)}"]\n` +
  "  expect(root).toBeDefined()\n" +
  '  expect(readFileSync(join(String(root), "akasha/carried.txt"), "utf8")).toBe("carried\\n") })\n'

export const BURNS =
  'import { test } from "bun:test"\n' +
  'test("one", () => { const until = Bun.nanoseconds() + 2e9\n' +
  "  while (Bun.nanoseconds() < until) {} })\n"

export const THROWS = 'throw new Error("this file will not load")\n'

export const SETS = "globalThis.held = true\n"

export const NEEDS =
  'import { expect, test } from "bun:test"\n' +
  'test("one", () => { expect(globalThis.held).toBe(true) })\n'

export const SWELLS =
  'import { expect, test } from "bun:test"\n' +
  'test("one", () => { const held = new Uint8Array(300e6)\n' +
  "  held.fill(1)\n" +
  "  expect(held[0]).toBe(1) })\n"

export const LOADED = "akasha/loaded.log"

export const COUNTS =
  'import { appendFileSync } from "node:fs"\n' +
  'import { join } from "node:path"\n' +
  'import { expect, test } from "bun:test"\n' +
  'appendFileSync(join(import.meta.dir, "loaded.log"), "one\\n")\n' +
  'test("one", () => { expect(1).toBe(1) })\n'

export const WEB_BUNFIG = "akasha/web/bunfig.toml"
