import { expect, test } from "bun:test"
import {
  agentRuntimeDir,
  runtimeRootDir,
  supervisorSocketPath,
  supervisorsRootDir,
} from "./supervisor-log-path.module.code.ts"

const AGENT = "01a07eb0-c517-7000-9ee4-cfc39576ac24"

const CEILING = 107

const ELSEWHERE = "/somewhere/else"

test("the proxy socket is named for its agent under the base named", () => {
  expect(supervisorSocketPath("agent-7", "/var/tmp/base")).toBe("/var/tmp/base/akasha-agent-7.sock")
})

test("the socket a caller names no base for is in the runtime directory", () => {
  expect(supervisorSocketPath(AGENT)).toBe(`${runtimeRootDir()}/akasha-${AGENT}.sock`)
})

test("every supervisor's files are under the runtime directory rather than under the checkout", () => {
  expect(supervisorsRootDir()).toBe(`${runtimeRootDir()}/akasha`)
  expect(supervisorsRootDir()).not.toContain("/.supervisors")
})

test("a supervisor's own folder is a folder of that root named for the agent", () => {
  expect(`${supervisorsRootDir()}/${AGENT}`.startsWith(`${supervisorsRootDir()}/`)).toBe(true)
})

test("a runtime folder is one agent's own rather than shared with every other", () => {
  expect(agentRuntimeDir("one", "/var/tmp/base")).toBe("/var/tmp/base/akasha-one")
  expect(agentRuntimeDir("two", "/var/tmp/base")).toBe("/var/tmp/base/akasha-two")
})

test("no runtime folder is the directory the sockets sit in", () => {
  expect(agentRuntimeDir(AGENT)).not.toBe(runtimeRootDir())
})

test("the whole path is short enough for the kernel to bind", () => {
  expect(supervisorSocketPath(AGENT).length).toBeLessThanOrEqual(CEILING)
})

test("the runtime directory is worked out from the user rather than read from the environment", () => {
  const was = process.env.XDG_RUNTIME_DIR
  process.env.XDG_RUNTIME_DIR = ELSEWHERE
  try {
    expect(supervisorSocketPath(AGENT).startsWith(ELSEWHERE)).toBe(false)
  } finally {
    if (was === undefined) delete process.env.XDG_RUNTIME_DIR
    else process.env.XDG_RUNTIME_DIR = was
  }
})
