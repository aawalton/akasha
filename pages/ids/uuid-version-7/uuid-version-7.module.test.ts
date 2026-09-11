import { expect, test } from "bun:test"
import {
  statesVersionSeven,
  uuidVersion7,
} from "akasha/pages/ids/uuid-version-7/uuid-version-7.module.code.ts"

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

test("a uuid this module worked out is read as version 7", () => {
  expect(statesVersionSeven(uuidVersion7())).toBe(true)
})

test("a uuid of another version, another variant or another case is not", () => {
  expect(statesVersionSeven("019db533-f382-457e-93d6-8b217ef99d58")).toBe(false)
  expect(statesVersionSeven("019db533-f382-757e-03d6-8b217ef99d58")).toBe(false)
  expect(statesVersionSeven("019DB533-F382-757E-93D6-8B217EF99D58")).toBe(false)
  expect(statesVersionSeven("019db533-f382-757e-93d6-8b217ef99d5")).toBe(false)
})
