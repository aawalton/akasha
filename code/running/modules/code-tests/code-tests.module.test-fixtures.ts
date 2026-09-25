import { RUNNING } from "akasha/code/running/modules/code-tests/code-tests.module.code.ts"
import {
  AKASHA,
  rootEnvName,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export const PASSES =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(1) })\n'

export const FAILS =
  'import { expect, test } from "bun:test"\ntest("one", () => { expect(1).toBe(2) })\n'

export const MARKED =
  'import { expect, test } from "bun:test"\n' +
  `test("one", () => { expect(process.env["${RUNNING}"]).toBe("1") })\n`

export const PLANTED: Readonly<Record<string, string>> = {
  GOOGLE_OAUTH_REFRESH_TOKEN: "planted",
  GIT_ACCESS_TOKEN: "planted",
  SOPS_AGE_KEY: "planted",
  SOPS_AGE_KEY_FILE: "/planted/keys.txt",
  BASH_ENV: "/planted/secrets.env",
  HELD_UNHEARD_OF: "planted",
}

export const BARE =
  'import { expect, test } from "bun:test"\n' +
  `test("one", () => { for (const name of ${JSON.stringify(Object.keys(PLANTED))})\n` +
  "  expect(process.env[name]).toBeUndefined() })\n"

export const ROOTED =
  'import { expect, test } from "bun:test"\n' +
  'import { readFileSync } from "node:fs"\n' +
  'import { join } from "node:path"\n' +
  `test("one", () => { const root = process.env["${rootEnvName(AKASHA)}"]\n` +
  "  expect(root).toBeDefined()\n" +
  '  expect(readFileSync(join(String(root), "akasha/carried.txt"), "utf8")).toBe("carried\\n") })\n'

export const BURNS =
  'import { test } from "bun:test"\n' +
  'test("one", () => { const at = process.cpuUsage()\n' +
  "  for (;;) {\n" +
  "    const spent = process.cpuUsage(at)\n" +
  "    if ((spent.user + spent.system) / 1e6 >= 1.6) break\n" +
  "  } })\n"

export const WAITS =
  'import { afterAll, expect, test } from "bun:test"\n' +
  "afterAll(() => { Bun.sleepSync(8000) })\n" +
  'test("one", () => { expect(1).toBe(1) })\n'

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

export const WEB_BUNFIG = "akasha/web/bunfig.toml"
