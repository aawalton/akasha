export const KEEPS = "export const kept = 1\n"

export const TURNS = "export const kept = 2\n"

export const CHECKS =
  'import { expect, test } from "bun:test"\n' +
  'import { kept } from "./one.module.code.ts"\n' +
  'test("kept", () => { expect(kept).toBe(1) })\n'

export const LOOK = ".ring { color: red }\n"

export const LOOKS =
  'import { expect, test } from "bun:test"\n' +
  'import look from "./look.css"\n' +
  'test("look", () => { expect(look).toContain("red") })\n'

export const ONE = "/repo/one/held.module.code.ts"

export const TWO = "/repo/two/held.module.test.ts"

export function manifestOf(ways: Record<string, string>): string {
  return JSON.stringify({ name: "@akasha/held", exports: ways })
}

export const WAYS = { "./asking/testing": "./asking/asking.module.test-fixtures.ts" }

export const ASKED = manifestOf({ "./asking": "./old/asking.ts" })

export const TOLD = manifestOf({ "./telling": "./new/telling.ts" })

export const BOTH = manifestOf({
  "./asking": "./old/asking.ts",
  "./telling": "./new/telling.ts",
})

export const MOVED = JSON.stringify({
  name: "@fake/moved",
  exports: { "./held": "./held.module.code.ts" },
})

export const OUTSIDE =
  'import { expect, test } from "bun:test"\n' +
  'import { kept } from "@fake/moved/held"\n' +
  'test("kept", () => { expect(kept).toBe(2) })\n'

export const REACHES =
  'import { expect, test } from "bun:test"\n' +
  'const { kept } = await import("../held/one.module.code.ts")\n' +
  'test("kept", () => { expect(kept).toBe(2) })\n'

export const HELD = "akasha/held/one.module.code.ts"

export const ASKS = "akasha/asks/one.module.test.ts"

export const HAD = JSON.stringify({
  name: "@fake/held",
  exports: { "./gone": "./gone.module.code.ts" },
})

export const HAS = JSON.stringify({
  name: "@fake/held",
  exports: { "./come": "./come.module.code.ts" },
})

export const ASIDE =
  'import { expect, test } from "bun:test"\n' +
  'import { kept } from "@fake/held/come"\n' +
  'test("kept", () => { expect(kept).toBe(2) })\n'
