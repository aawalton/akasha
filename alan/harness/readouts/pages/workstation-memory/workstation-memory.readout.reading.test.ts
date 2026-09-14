import { expect, test } from "bun:test"
import { memoryIn } from "akasha/alan/harness/readouts/pages/workstation-memory/workstation-memory.readout.reading.code.ts"

const MEMINFO =
  "MemTotal:       64000000 kB\n" +
  "MemFree:         8000000 kB\n" +
  "MemAvailable:   16000000 kB\n" +
  "Buffers:         1000000 kB\n"

test("the share is what is not available over the total", () => {
  expect(memoryIn(MEMINFO)).toBe(75)
})

test("memory the kernel could reclaim counts as available rather than in use", () => {
  const freeOnly = "MemTotal:       100 kB\nMemFree:         10 kB\nMemAvailable:    60 kB\n"
  expect(memoryIn(freeOnly)).toBe(40)
})

test("a meminfo naming no total or no available memory is no reading rather than zero", () => {
  expect(memoryIn("MemTotal:       100 kB\n")).toBeNull()
  expect(memoryIn("MemAvailable:   100 kB\n")).toBeNull()
  expect(memoryIn("MemTotal:       0 kB\nMemAvailable:   0 kB\n")).toBeNull()
  expect(memoryIn("")).toBeNull()
})

test("a share is held between nothing and the whole", () => {
  expect(memoryIn("MemTotal:       100 kB\nMemAvailable:   100 kB\n")).toBe(0)
  expect(memoryIn("MemTotal:       100 kB\nMemAvailable:   0 kB\n")).toBe(100)
})
