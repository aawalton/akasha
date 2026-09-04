import { expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  CONSOLE_LOG_NAME,
  CONSOLE_SOURCE,
  consoleSentTo,
  processSeams,
} from "./proxy-entry.module.code.ts"

const SCRATCH = "/var/tmp"

const NO_SEAT = "proxy-entry-test-names-no-seat"

test("the console source and log name are the ones the old entrypoint wrote under", () => {
  expect(CONSOLE_SOURCE).toBe("oauth-proxy-console")
  expect(CONSOLE_LOG_NAME).toBe("oauth-proxy.log")
})

test("every seam the gateway process asks for is answered by a function", () => {
  const seams = processSeams()
  expect(typeof seams.socketPathFor).toBe("function")
  expect(typeof seams.consoleTo).toBe("function")
  expect(typeof seams.started).toBe("function")
  expect(typeof seams.stateWritten).toBe("function")
  expect(typeof seams.stateCleared).toBe("function")
  expect(typeof seams.flushed).toBe("function")
  expect(typeof seams.printed).toBe("function")
  expect(typeof seams.refused).toBe("function")
  expect(typeof seams.threw).toBe("function")
  expect(typeof seams.signalled).toBe("function")
  expect(typeof seams.exited).toBe("function")
})

test("the process id answered is this process's own", () => {
  expect(processSeams().pid).toBe(process.pid)
})

test("the environment answered is this process's own", () => {
  expect(processSeams().env).toBe(process.env)
})

test("the root answered is an absolute path", () => {
  expect(processSeams().root.startsWith("/")).toBe(true)
})

test("the socket path names the agent it was asked about", () => {
  expect(processSeams().socketPathFor("agent-9002")).toContain("agent-9002")
})

test("an agent id naming no seat sends the console to the file alone", () => {
  const dir = mkdtempSync(join(SCRATCH, "proxy-entry-"))
  const said = console.log
  const warned = console.warn
  const threw = console.error
  try {
    consoleSentTo(dir, NO_SEAT)
    console.log("a line the gateway wrote")
  } finally {
    console.log = said
    console.warn = warned
    console.error = threw
  }
  const written = readFileSync(join(dir, CONSOLE_LOG_NAME), "utf8")
  rmSync(dir, { recursive: true, force: true })
  expect(written).toContain("a line the gateway wrote")
  expect(written).toContain("[LOG]")
})
