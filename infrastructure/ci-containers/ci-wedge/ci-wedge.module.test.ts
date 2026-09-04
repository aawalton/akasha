import { expect, test } from "bun:test"
import {
  CPU_IDLE_THRESHOLD_CORES,
  decideWedge,
  isWedgeCandidate,
  WEDGE_LOG_STALE_MS,
  WEDGE_MIN_RUNNING_MS,
} from "./ci-wedge.module.code.ts"

const NOW = 10_000_000

const running = {
  stepStatus: "running",
  stepTerminated: false,
  startedAtMs: NOW - WEDGE_MIN_RUNNING_MS,
  now: NOW,
}

test("a step is weighed for a wedge only once it has run long enough to judge", () => {
  expect(isWedgeCandidate(running, WEDGE_MIN_RUNNING_MS)).toBe(true)
  expect(isWedgeCandidate({ ...running, startedAtMs: NOW - 1 }, WEDGE_MIN_RUNNING_MS)).toBe(false)
})

test("a step that is not running is not weighed for a wedge", () => {
  expect(isWedgeCandidate({ ...running, stepStatus: "launching" }, WEDGE_MIN_RUNNING_MS)).toBe(
    false
  )
  expect(isWedgeCandidate({ ...running, stepStatus: null }, WEDGE_MIN_RUNNING_MS)).toBe(false)
})

test("a step whose process has already ended is not weighed for a wedge", () => {
  expect(isWedgeCandidate({ ...running, stepTerminated: true }, WEDGE_MIN_RUNNING_MS)).toBe(false)
})

test("a step with no start time is not weighed for a wedge", () => {
  expect(isWedgeCandidate({ ...running, startedAtMs: null }, WEDGE_MIN_RUNNING_MS)).toBe(false)
})

const stale = {
  cpuRateCores: 0,
  idleThresholdCores: CPU_IDLE_THRESHOLD_CORES,
  logAgeMs: WEDGE_LOG_STALE_MS,
  logStaleMs: WEDGE_LOG_STALE_MS,
}

test("a step burning no cpu whose log has stood still is wedged", () => {
  expect(decideWedge(stale)).toEqual({ wedged: true })
})

test("a step no cpu reading is held for is not judged wedged", () => {
  expect(decideWedge({ ...stale, cpuRateCores: null })).toEqual({
    wedged: false,
    reason: "no-data",
  })
})

test("a step burning cpu is not wedged however old its log", () => {
  expect(decideWedge({ ...stale, cpuRateCores: 1 })).toEqual({
    wedged: false,
    reason: "cpu-active",
  })
})

test("a step whose log is fresh is not wedged", () => {
  expect(decideWedge({ ...stale, logAgeMs: 0 })).toEqual({ wedged: false, reason: "log-fresh" })
})

test("a step whose log age is unknown is not wedged", () => {
  expect(decideWedge({ ...stale, logAgeMs: null })).toEqual({
    wedged: false,
    reason: "log-unknown",
  })
})
