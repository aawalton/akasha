import { expect, test } from "bun:test"
import type { ProcLivenessEntry } from "akasha/agents/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { strayAmong } from "akasha/agents/modules/stray-process/stray-process.module.code.ts"
import type { Liveness } from "akasha/agents/subagents/modules/liveness/subagent-liveness.module.code.ts"

const SEAT = "01a09581-cb35-7000-b00f-7156d6b3ce13"

const ACTING = `${SEAT}--a05867e64f733ddec`

const ANOTHER = `${SEAT}--a32671c5cf0526c7f`

function procAt(pid: number, actingAgentId?: string): ProcLivenessEntry {
  return { agentId: SEAT, actingAgentId, cmdline: `sleep ${String(pid)}`, pid }
}

function saying(liveness: Liveness): (actingAgentId: string) => Promise<Liveness> {
  return async () => liveness
}

test("a process is a stray where the seat's transcript names its subagent as returned", async () => {
  const read = await strayAmong([procAt(11, ACTING), procAt(12, ACTING)], saying("returned"))

  expect(read.strays.map((one) => one.pid)).toEqual([11, 12])
  expect(read.strays[0]?.actingAgentId).toBe(ACTING)
  expect(read.unread).toEqual([])
})

test("a process whose subagent the transcript names as working is no stray", async () => {
  const read = await strayAmong([procAt(11, ACTING)], saying("working"))

  expect(read.strays).toEqual([])
  expect(read.unread).toEqual([])
})

test("a process whose subagent the transcript could not be read for is no stray", async () => {
  const read = await strayAmong([procAt(11, ACTING)], saying("unread"))

  expect(read.strays).toEqual([])
  expect(read.unread).toEqual([ACTING])
})

test("a process stating an acting agent that names no subagent is passed over", async () => {
  const read = await strayAmong([procAt(11, SEAT), procAt(12)], saying("returned"))

  expect(read.strays).toEqual([])
  expect(read.unread).toEqual([])
})

test("each subagent is asked about on its own", async () => {
  const asked: string[] = []
  const read = await strayAmong(
    [procAt(11, ACTING), procAt(12, ANOTHER), procAt(13, ACTING)],
    async (actingAgentId) => {
      asked.push(actingAgentId)
      return actingAgentId === ACTING ? "returned" : "working"
    }
  )

  expect(asked.sort()).toEqual([ACTING, ANOTHER].sort())
  expect(read.strays.map((one) => one.pid)).toEqual([11, 13])
})
