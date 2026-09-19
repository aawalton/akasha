import { expect, test } from "bun:test"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import {
  type Answer,
  actingNamedOn,
  actingOf,
  answerAsked,
  type ReadingFor,
  type SeatPaging,
  strayAmong,
} from "akasha/agent/modules/stray-process/stray-process.module.code.ts"
import type { Liveness } from "akasha/agent/subagent/modules/liveness/subagent-liveness.module.code.ts"

const SEAT = "01a09581-cb35-7000-b00f-7156d6b3ce13"

const ACTING = `${SEAT}--a05867e64f733ddec`

const ANOTHER = `${SEAT}--a32671c5cf0526c7f`

const refusing: SeatPaging = () => {
  throw new Error("the index would not answer which pages are seats")
}

const FILED = "where the index files a page"

const seated: SeatPaging = () => FILED

const noSeat: SeatPaging = () => null

function transcribing(liveness: Liveness): ReadingFor {
  return async () => ({ liveness, why: "what this test hands back" })
}

function procAt(pid: number, actingAgentId?: string): ProcLivenessEntry {
  return { agentId: SEAT, actingAgentId, cmdline: `sleep ${String(pid)}`, pid }
}

function requoted(text: string): string {
  return text.replaceAll("'", `'"'"'`)
}

function wrapperAt(pid: number, named: string): ProcLivenessEntry {
  const exported = `export ACTING_AGENT_ID='${named}'\nsleep 900; echo done`
  const weighed = `eval '. '"'"'/weigh.sh'"'"'`
  return { agentId: SEAT, cmdline: `/bin/bash -c ${weighed}\n${requoted(exported)}`, pid }
}

function saying(answer: Answer): (actingAgentId: string) => Promise<Answer> {
  return async () => answer
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

test("a shell a tool call runs in is named by its command line rather than by its environment", async () => {
  const read = await strayAmong([wrapperAt(11, ACTING)], saying("returned"))

  expect(read.strays.map((one) => one.pid)).toEqual([11])
  expect(read.strays[0]?.actingAgentId).toBe(ACTING)
})

test("the command line is read only in the shape the harness composes", () => {
  expect(actingNamedOn(`export ACTING_AGENT_ID='${ACTING}'\nsleep 900`)).toBe(ACTING)
  expect(actingNamedOn(requoted(`export ACTING_AGENT_ID='${ACTING}'\n`))).toBe(ACTING)
})

test("a command line that merely mentions an acting agent names none", async () => {
  const weighed = `{"ran":"export ACTING_AGENT_ID='\\''${ACTING}'\\''"}\n`

  expect(actingNamedOn(`grep -rn ${ACTING} /var/log\n`)).toBeNull()
  expect(actingNamedOn(`echo export ACTING_AGENT_ID=${ACTING}\n`)).toBeNull()
  expect(actingNamedOn(weighed)).toBeNull()
  expect(actingNamedOn(requoted(weighed))).toBeNull()

  const read = await strayAmong(
    [{ agentId: SEAT, cmdline: `grep -rn ${ACTING} /var/log`, pid: 11 }],
    saying("returned")
  )

  expect(read.strays).toEqual([])
})

test("a subagent whose seat no page carries has departed, so its processes are strays", async () => {
  const read = await strayAmong([procAt(11, ACTING), procAt(12, ACTING)], saying("gone"))

  expect(read.strays.map((one) => one.pid)).toEqual([11, 12])
  expect(read.unread).toEqual([])
})

test("a seat the index carries no page for is gone", async () => {
  expect(await answerAsked(ACTING, () => null)).toBe("gone")
})

test("an index that would not answer leaves the subagent unread rather than gone", async () => {
  expect(await answerAsked(ACTING, refusing)).toBe("unread")
})

test("an index that would not answer yields no stray", async () => {
  const read = await strayAmong([procAt(11, ACTING)], (one) => answerAsked(one, refusing))

  expect(read.strays).toEqual([])
  expect(read.unread).toEqual([ACTING])
})

test("a subagent the transcript records a return for has departed", async () => {
  const asking = (one: string): Promise<Answer> =>
    answerAsked(one, seated, transcribing("returned"))

  expect(await asking(ACTING)).toBe("returned")

  const read = await strayAmong([procAt(11, ACTING), procAt(12, ACTING)], asking)

  expect(read.strays.map((one) => one.pid)).toEqual([11, 12])
  expect(read.unread).toEqual([])
})

test("a subagent whose transcript names it as running is no stray", async () => {
  const asking = (one: string): Promise<Answer> => answerAsked(one, seated, transcribing("working"))

  expect(await asking(ACTING)).toBe("working")

  const read = await strayAmong([procAt(11, ACTING)], asking)

  expect(read.strays).toEqual([])
  expect(read.unread).toEqual([])
})

test("a transcript that could not be read leaves the subagent unread", async () => {
  const asking = (one: string): Promise<Answer> => answerAsked(one, seated, transcribing("unread"))

  expect(await asking(ACTING)).toBe("unread")

  const read = await strayAmong([procAt(11, ACTING)], asking)

  expect(read.strays).toEqual([])
  expect(read.unread).toEqual([ACTING])
})

test("a seat no page carries is gone whatever its transcript says", async () => {
  expect(await answerAsked(ACTING, noSeat, transcribing("working"))).toBe("gone")
  expect(await answerAsked(ACTING, noSeat, transcribing("unread"))).toBe("gone")

  const read = await strayAmong([procAt(11, ACTING), procAt(12, ACTING)], (one) =>
    answerAsked(one, noSeat, transcribing("working"))
  )

  expect(read.strays.map((one) => one.pid)).toEqual([11, 12])
  expect(read.unread).toEqual([])
})

test("the environment is taken where the command line disagrees", async () => {
  const held = { ...wrapperAt(11, ANOTHER), actingAgentId: ACTING }

  expect(actingNamedOn(held.cmdline)).toBe(ANOTHER)
  expect(actingOf(held)).toBe(ACTING)

  const read = await strayAmong([held], saying("returned"))

  expect(read.strays.map((one) => one.actingAgentId)).toEqual([ACTING])
})
