import { expect, test } from "bun:test"
import {
  memoryIn,
  sampler,
} from "akasha/alan/harness/readout/group/pages/workstation/readouts/memory/workstation-memory.readout.reading.code.ts"

const MEMINFO =
  "MemTotal:       64000000 kB\n" +
  "MemFree:         8000000 kB\n" +
  "MemAvailable:   16000000 kB\n" +
  "Buffers:         1000000 kB\n"

test("the reading is the gigabytes the kernel says are available", () => {
  expect(memoryIn(MEMINFO)).toBe(15.3)
})

test("memory the kernel could reclaim counts as available rather than as gone", () => {
  const freeOnly = "MemFree:         1048576 kB\nMemAvailable:    3145728 kB\n"
  expect(memoryIn(freeOnly)).toBe(3)
})

test("a gigabyte is a kernel kilobyte over a thousand and twenty-four squared", () => {
  expect(memoryIn("MemAvailable:   1048576 kB\n")).toBe(1)
})

test("a reading is kept to a tenth of a gigabyte", () => {
  expect(memoryIn("MemAvailable:   1101005 kB\n")).toBe(1.1)
  expect(memoryIn("MemAvailable:   1153434 kB\n")).toBe(1.1)
})

test("a meminfo naming no available memory is no reading rather than zero", () => {
  expect(memoryIn("MemTotal:       100 kB\n")).toBeNull()
  expect(memoryIn("MemFree:        100 kB\n")).toBeNull()
  expect(memoryIn("")).toBeNull()
})

test("a sample reads the memory off the kernel's meminfo alone", () => {
  expect(sampler()({ stat: () => "", meminfo: () => MEMINFO })).toBe(15.3)
})

test("no memory available is a reading of nothing", () => {
  expect(memoryIn("MemAvailable:   0 kB\n")).toBe(0)
})
