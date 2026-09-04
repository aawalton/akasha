import { expect, test } from "bun:test"
import {
  type IdleObservation,
  isIdle,
  isIdleForPreservingRestart,
  isIdleForPreservingRestartPastCliff,
  isIgnoredMcpChildCmdline,
  preservingRestartBusyReason,
} from "./supervisor-idle-decide.module.code.ts"

const QUIET: IdleObservation = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}

test("a quiet seat with Claude present is idle", () => {
  expect(isIdle(QUIET)).toBe(true)
})

test("a seat Claude has left is not idle", () => {
  expect(isIdle({ ...QUIET, claudePresent: false })).toBe(false)
})

test("a count that was never read is not a count of zero", () => {
  expect(isIdle({ ...QUIET, busyChildren: null })).toBe(false)
  expect(isIdleForPreservingRestart({ ...QUIET, busyChildren: null })).toBe(false)
})

test("a dispatched child in flight stops idle but not a preserving restart", () => {
  const held = { ...QUIET, inFlightDispatchChildren: 2 }
  expect(isIdle(held)).toBe(false)
  expect(isIdleForPreservingRestart(held)).toBe(true)
})

test("past the cliff a busy child no longer holds the restart back", () => {
  const held = { ...QUIET, busyChildren: 3 }
  expect(isIdleForPreservingRestart(held)).toBe(false)
  expect(isIdleForPreservingRestartPastCliff(held)).toBe(true)
})

test("the busy reason names every count that is not zero", () => {
  const said = preservingRestartBusyReason({
    inFlight: 2,
    busyChildren: null,
    inFlightDispatchChildren: 0,
    claudePresent: false,
  })
  expect(said).toBe("inFlight=2, busyChildren=unread, claude-absent")
})

test("the busy reason of a quiet seat is idle", () => {
  expect(preservingRestartBusyReason(QUIET)).toBe("idle")
})

test("the busy reason may be asked to pass over busy children", () => {
  const held = { ...QUIET, busyChildren: 4 }
  expect(preservingRestartBusyReason(held)).toBe("busyChildren=4")
  expect(preservingRestartBusyReason(held, { ignoreBusyChildren: true })).toBe("idle")
})

test("a child running MCP is passed over and any other child is not", () => {
  expect(isIgnoredMcpChildCmdline("bun run /home/a/mcp.ts")).toBe(true)
  expect(isIgnoredMcpChildCmdline("npm exec @playwright/mcp")).toBe(true)
  expect(isIgnoredMcpChildCmdline("bun run build.ts")).toBe(false)
})
