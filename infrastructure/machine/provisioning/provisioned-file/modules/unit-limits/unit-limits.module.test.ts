import { expect, test } from "bun:test"
import {
  unitBodyIn,
  unitLimitLines,
} from "akasha/infrastructure/machine/provisioning/provisioned-file/modules/unit-limits/unit-limits.module.code.ts"

test("a share and both memory ceilings are written in that order", () => {
  expect(unitLimitLines({ killMemoryMb: 98304, maxMemoryMb: 81920, cpuShare: 30 })).toEqual([
    "CPUWeight=30",
    "MemoryHigh=80G",
    "MemoryMax=96G",
  ])
})

test("a value the page does not state writes no line", () => {
  expect(unitLimitLines({ cpuShare: 30 })).toEqual(["CPUWeight=30"])
  expect(unitLimitLines({})).toEqual([])
})

test("megabytes short of a whole gigabyte are written in megabytes", () => {
  expect(unitLimitLines({ maxMemoryMb: 1536 })).toEqual(["MemoryHigh=1536M"])
})

test("a body opens with the lines handed in and ends with one newline", () => {
  expect(unitBodyIn(["[Unit]", ""], "Slice", { cpuShare: 30 })).toBe(
    "[Unit]\n\n[Slice]\nCPUWeight=30\n"
  )
})
