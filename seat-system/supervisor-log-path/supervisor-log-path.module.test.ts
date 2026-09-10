import { expect, test } from "bun:test"
import {
  runtimeRootDir,
  supervisorFilePath,
  supervisorFileRelPath,
  supervisorPageRelPath,
  supervisorSocketPath,
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

test("the whole path is short enough for the kernel to bind", () => {
  expect(supervisorSocketPath(AGENT).length).toBeLessThanOrEqual(CEILING)
})

test("a supervisor's page is named for its agent and sits in a folder of that agent's id", () => {
  expect(supervisorPageRelPath(AGENT)).toBe(
    `seat-system/seats/supervisors/pages/${AGENT}/supervisor-${AGENT}.supervisor.ts`
  )
})

test("a file a supervisor writes sits beside that supervisor's page, outside the commit", () => {
  expect(supervisorFileRelPath(AGENT, "console")).toBe(
    `seat-system/seats/supervisors/pages/${AGENT}/supervisor-${AGENT}.supervisor.console.uncommitted.log`
  )
})

test("the whole path a caller opens is read against the root that caller names", () => {
  expect(supervisorFilePath(AGENT, "presence", "/var/tmp/base")).toBe(
    `/var/tmp/base/${supervisorFileRelPath(AGENT, "presence")}`
  )
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
