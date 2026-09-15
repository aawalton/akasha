import { expect, test } from "bun:test"
import {
  processorIn,
  processorTimesIn,
} from "akasha/alan/harness/readout/pages/workstation-processor/workstation-processor.readout.reading.code.ts"

const STAT =
  "cpu  100 10 50 800 40 5 5 0 20 0\n" + "cpu0 50 5 25 400 20 2 2 0 10 0\n" + "intr 12345\n"

test("the cpu line is read as busy time and total time, with guest time left under its host", () => {
  expect(processorTimesIn(STAT)).toEqual({ busy: 170, total: 1010 })
})

test("waiting on a disk counts as idle", () => {
  const times = processorTimesIn("cpu  0 0 0 100 100 0 0 0\n")
  expect(times).toEqual({ busy: 0, total: 200 })
})

test("a stat with no cpu line or a line that does not parse is no reading", () => {
  expect(processorTimesIn("intr 1\n")).toBeNull()
  expect(processorTimesIn("cpu  1 2 3\n")).toBeNull()
  expect(processorTimesIn("cpu  a b c d e f g h\n")).toBeNull()
  expect(processorTimesIn("")).toBeNull()
})

test("the share is the busy time over the total time between two takes", () => {
  const before = { busy: 100, total: 1000 }
  const after = { busy: 150, total: 1200 }
  expect(processorIn(before, after)).toBe(25)
})

test("two takes between which no time passed are no reading rather than zero", () => {
  const same = { busy: 100, total: 1000 }
  expect(processorIn(same, same)).toBeNull()
  expect(processorIn({ busy: 100, total: 1000 }, { busy: 90, total: 900 })).toBeNull()
})

test("a share is held between nothing and the whole", () => {
  expect(processorIn({ busy: 100, total: 1000 }, { busy: 100, total: 1100 })).toBe(0)
  expect(processorIn({ busy: 100, total: 1000 }, { busy: 200, total: 1100 })).toBe(100)
})
