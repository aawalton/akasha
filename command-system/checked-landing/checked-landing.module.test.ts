import { expect, test } from "bun:test"
import { CHECKED } from "./checked-landing.module.code.ts"

test("a checked landing names the change kind the checks are read off", () => {
  expect(CHECKED.slug).toBe("change-checked")
})

test("a checked landing runs the checks", () => {
  expect(CHECKED.runsChecks).toBe(true)
})

test("a checked landing runs no warrant", () => {
  expect(CHECKED.runsWarrants).toBe(false)
})
