import { describe, expect, test } from "bun:test"
import { seatBindingInArgv } from "akasha/infrastructure/memory/reaping/modules/memory-reaper-owner/memory-reaper-owner.module.code.ts"

const AGENT = "11111111-2222-3333-4444-555555555555"
const SESSION = "66666666-7777-8888-9999-aaaaaaaaaaaa"

describe("seatBindingInArgv", () => {
  test("reads a seat off a separated flag", () => {
    expect(seatBindingInArgv(["bun", "--agent-id", AGENT], 7, 0)).toEqual({
      agentId: AGENT,
      sessionId: null,
      pid: 7,
      hops: 0,
    })
  })

  test("reads a seat off an equals form", () => {
    expect(seatBindingInArgv(["bun", `--agent-id=${AGENT}`], 7, 2)?.agentId).toBe(AGENT)
  })

  test("carries the session where one is named", () => {
    const found = seatBindingInArgv(["bun", "--agent-id", AGENT, "--session-id", SESSION], 7, 0)
    expect(found?.sessionId).toBe(SESSION)
  })

  test("names no seat where the agent id is no uuid", () => {
    expect(seatBindingInArgv(["bun", "--agent-id", "athena"], 7, 0)).toBeNull()
  })

  test("names no seat where the flag is alone", () => {
    expect(seatBindingInArgv(["bun", "--agent-id"], 7, 0)).toBeNull()
  })
})
