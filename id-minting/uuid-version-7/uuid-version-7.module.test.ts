import { expect, test } from "bun:test"
import { uuidVersion7 } from "./uuid-version-7.module.code.ts"

const VARIANT = "89ab"

test("a uuid version 7 carries its version, its variant and the time it was worked out", () => {
  const said = uuidVersion7(0x0123456789ab)
  expect(said).toHaveLength(36)
  expect(said.slice(0, 15)).toBe("01234567-89ab-7")
  expect(VARIANT).toContain(said[19] ?? "")
})

test("two worked out in the same millisecond are still two", () => {
  const at = Date.now()
  expect(uuidVersion7(at)).not.toBe(uuidVersion7(at))
})
