import { expect, test } from "bun:test"
import {
  TRUSTED_MONTHS,
  trustedFrom,
  UNATTENDED_DAYS,
  unattendedFrom,
} from "akasha/alan/harness/monarch/modules/windows/monarch-windows.module.code.ts"

test("a window is cut from the moment handed in rather than from the clock", () => {
  const at = new Date("2026-09-03T00:00:00.000Z")
  expect(trustedFrom(at)).toBe("2025-09-03")
  expect(unattendedFrom(at)).toBe("2026-08-27")
})

test("the trusted window is twelve months and the unattended window is seven days", () => {
  expect(TRUSTED_MONTHS).toBe(12)
  expect(UNATTENDED_DAYS).toBe(7)
})
