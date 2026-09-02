import { existsSync, mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { expect, mock, test } from "bun:test"

// THE LATCH IS A RECORD THAT ALAN WAS TOLD. These run the service against a temporary latch and
// an empty checkout, with the one road to Alan stubbed, so nothing is written to his feed and the
// live latch is never touched.

const latchAt = join(mkdtempSync(join(tmpdir(), "arrival-latch-")), "latch")
process.env.HEALTH_SAMPLES_ARRIVAL_LATCH = latchAt

const emptyRoot = mkdtempSync(join(tmpdir(), "arrival-root-"))

let sends = 0
let refuse = true

mock.module("../tools/lib/notify.ts", () => ({
  ALAN_PERSON: "alan",
  notify: async () => {
    sends += 1
    if (refuse) throw new Error("the push road refused")
  },
}))

const { main } = await import("./health-samples-arrival-watchdog.ts")

const run = () => main(["--notify", "--root", emptyRoot])

test("a send that throws holds no latch, so the next run states it again", async () => {
  refuse = true
  expect(await run()).toBe(1)
  expect(sends).toBe(1)
  // The defect this covers wrote the latch before the send, so a throw here left the silence
  // recorded as stated and no run ever said it again.
  expect(existsSync(latchAt)).toBe(false)
})

test("the retry is attempted, and a send that lands holds the latch", async () => {
  refuse = false
  expect(await run()).toBe(1)
  expect(sends).toBe(2)
  expect(readFileSync(latchAt, "utf8")).toBe("none")
})

test("the same silence is stated once rather than on every run", async () => {
  refuse = false
  expect(await run()).toBe(1)
  expect(sends).toBe(2)
})
