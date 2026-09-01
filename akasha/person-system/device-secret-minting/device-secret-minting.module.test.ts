import { expect, test } from "bun:test"
import { decideMintAction } from "./device-secret-minting.module.code.ts"

test("a device holding a secret mints none", () => {
  expect(decideMintAction({ ok: true, present: true })).toBe("skip")
})

test("a device holding no secret mints one", () => {
  expect(decideMintAction({ ok: true, present: false })).toBe("mint")
})

test("a device that could not be asked mints one, so a lost answer never leaves it without", () => {
  expect(decideMintAction({ ok: false })).toBe("mint")
})
