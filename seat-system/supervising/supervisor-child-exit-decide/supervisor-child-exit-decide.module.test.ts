import { expect, test } from "bun:test"
import {
  classifyChildExit,
  collapseChildExitStatus,
  decideShutdownExitWrite,
  decodeWaitStatus,
  STOP_REASON,
} from "./supervisor-child-exit-decide.module.code.ts"

test("a wait status carrying a signal is read as a signal rather than a code", () => {
  expect(decodeWaitStatus(15)).toEqual({ exitCode: null, signal: "SIGTERM" })
  expect(decodeWaitStatus(9)).toEqual({ exitCode: null, signal: "SIGKILL" })
})

test("a wait status carrying no signal is read as an exit code", () => {
  expect(decodeWaitStatus(0)).toEqual({ exitCode: 0, signal: null })
  expect(decodeWaitStatus(3 << 8)).toEqual({ exitCode: 3, signal: null })
})

test("a signalled stop collapses to 128 plus the signal number", () => {
  expect(collapseChildExitStatus({ exitCode: null, signal: "SIGTERM" })).toBe(143)
  expect(collapseChildExitStatus({ exitCode: 7, signal: null })).toBe(7)
  expect(collapseChildExitStatus({ exitCode: null, signal: null })).toBe(0)
})

test("a shutdown or a supervisor kill is deliberate however the child stopped", () => {
  const status = { exitCode: null, signal: "SIGKILL" }
  const shutting = classifyChildExit({ status, supervisorKilled: false, shuttingDown: true })
  expect(shutting.crashed).toBe(false)
  expect(shutting.stopReason).toBe(STOP_REASON.deliberate)
  const killed = classifyChildExit({ status, supervisorKilled: true, shuttingDown: false })
  expect(killed.crashed).toBe(false)
})

test("an unobservable status is a crash rather than a clean stop", () => {
  const held = classifyChildExit({
    status: { exitCode: null, signal: null },
    supervisorKilled: false,
    shuttingDown: false,
  })
  expect(held.crashed).toBe(true)
  expect(held.stopReason).toBe(STOP_REASON.childCrashed)
})

test("a clean exit is deliberate and a non-zero one is a crash", () => {
  const clean = classifyChildExit({
    status: { exitCode: 0, signal: null },
    supervisorKilled: false,
    shuttingDown: false,
  })
  expect(clean.crashed).toBe(false)
  const dirty = classifyChildExit({
    status: { exitCode: 2, signal: null },
    supervisorKilled: false,
    shuttingDown: false,
  })
  expect(dirty.crashed).toBe(true)
})

test("a classification that could not be made stamps a deliberate clean exit", () => {
  expect(decideShutdownExitWrite(null)).toEqual({
    stampCleanExit: true,
    stopReason: STOP_REASON.deliberate,
    recordCrash: false,
  })
})

test("a crash is stamped as a crash rather than as a clean exit", () => {
  const held = decideShutdownExitWrite({
    crashed: true,
    stopReason: STOP_REASON.childCrashed,
    reason: "child exited 2",
    status: { exitCode: 2, signal: null },
  })
  expect(held).toEqual({
    stampCleanExit: false,
    stopReason: STOP_REASON.childCrashed,
    recordCrash: true,
  })
})
