import { expect, test } from "bun:test"
import { decideRemoteControl } from "akasha/agent/claude-code/remote-control/modules/decide/claude-code-remote-control-decide.module.code.ts"

test("a headless seat is not under remote control", () => {
  expect(decideRemoteControl({ headless: true })).toBe(false)
})

test("a seat that is not headless is under remote control", () => {
  expect(decideRemoteControl({ headless: false })).toBe(true)
})
