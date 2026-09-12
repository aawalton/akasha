import { expect, test } from "bun:test"
import {
  interactiveCall,
  NOTICES_CALL,
  resetCall,
  revivingCall,
  type SeatCall,
  stopCall,
} from "akasha/code/editor/extension/seat-calls/seat-calls.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"

const SEAT = "aranya"

const EVERY: readonly SeatCall[] = [
  NOTICES_CALL,
  stopCall(SEAT),
  resetCall(SEAT),
  revivingCall(SEAT, "carry on"),
  interactiveCall(SEAT),
]

test("every call names the export its own slug spells, as the command server resolves it", () => {
  for (const one of EVERY) {
    expect(one.exported).toBe(exportedAs(one.slug))
  }
})

test("a stop ends the subagents under the seat along with the seat", () => {
  expect(stopCall(SEAT).args).toEqual([SEAT, "--force"])
})

test("a reset names the seat and nothing else", () => {
  expect(resetCall(SEAT).args).toEqual([SEAT])
})

test("a revive carries the prompt the harness answered", () => {
  expect(revivingCall(SEAT, "carry on").args).toEqual([SEAT, "--prompt", "carry on"])
})

test("a resume into a terminal states the interactive mode", () => {
  expect(interactiveCall(SEAT).args).toEqual([SEAT, "--start-mode", "interactive"])
})

test("asking for the prompt takes no argument", () => {
  expect(NOTICES_CALL.args).toEqual([])
})

test("a revive and an interactive resume are the one command, asked differently", () => {
  expect(revivingCall(SEAT, "x").slug).toBe(interactiveCall(SEAT).slug)
  expect(revivingCall(SEAT, "x").args).not.toEqual(interactiveCall(SEAT).args)
})

test("a stop, a reset, a resume and a notice are four commands", () => {
  expect(new Set(EVERY.map((one) => one.slug)).size).toBe(4)
})

test("a call names the seat by its name rather than by its id", () => {
  for (const one of EVERY) {
    if (one.args.length > 0) expect(one.args[0]).toBe(SEAT)
  }
})
