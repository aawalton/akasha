import { expect, test } from "bun:test"
import { stallSaid } from "akasha/check/code/pages/tests-pass/modules/stall-saying/stall-saying.module.code.ts"

test("a file the clock ended is said beside the processor seconds it spent", () => {
  expect(stallSaid(0.43, undefined)).toBe(", having spent 0.4 processor seconds")
})

test("what its processes were doing follows, one process to a line", () => {
  const said = stallSaid(1.2, "7 S wchan=do_wait threads S×1: sh\n8 D wchan=io threads D×1: cat")
  expect(said).toBe(
    ", having spent 1.2 processor seconds. What its processes were doing as it was ended:\n" +
      "  7 S wchan=do_wait threads S×1: sh\n" +
      "  8 D wchan=io threads D×1: cat"
  )
})
