import { expect, test } from "bun:test"
import { untakenRestart } from "akasha/agent/seat/reviving/modules/seat-resume/seat-resume.module.code.ts"

test("a gated restart a live seat still holds is queued rather than refused", () => {
  expect(untakenRestart(false, true)).toBe("queued")
})

test("a restart-now a live seat never took up is refused", () => {
  expect(untakenRestart(true, true)).toBe("refused")
})

test("a restart no live seat took up relaunches the seat, gated or not", () => {
  expect(untakenRestart(false, false)).toBe("relaunch")
  expect(untakenRestart(true, false)).toBe("relaunch")
})
