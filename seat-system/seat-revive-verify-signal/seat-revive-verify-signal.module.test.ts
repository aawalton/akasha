import { expect, test } from "bun:test"
import { classifyReviveVerifyExit } from "./seat-revive-verify-signal.module.code.ts"

test("a resume that exited cleanly revived its seat", () => {
  expect(classifyReviveVerifyExit(0)).toBe("revived")
})

test("a resume that exited three could not verify its seat", () => {
  expect(classifyReviveVerifyExit(3)).toBe("unverified")
})

test("every other exit is a failure", () => {
  expect(classifyReviveVerifyExit(1)).toBe("failed")
  expect(classifyReviveVerifyExit(2)).toBe("failed")
  expect(classifyReviveVerifyExit(4)).toBe("failed")
  expect(classifyReviveVerifyExit(137)).toBe("failed")
})
