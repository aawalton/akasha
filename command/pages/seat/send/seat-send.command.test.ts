import { expect, test } from "bun:test"
import type { Sending } from "akasha/agent/message/modules/sending/agent-message-sending.module.code.ts"
import { akashaSeatsThatExist } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { senderIn, sent } from "akasha/command/pages/seat/send/seat-send.command.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const SEATS: ReadonlyMap<string, string> = new Map([
  ["01a0-gm", "iris"],
  ["01a0-wb", "awen"],
])

const naming = (agentId: string): string | null => SEATS.get(agentId) ?? null

const TO = [...akashaSeatsThatExist().values()].sort()[0] ?? ""

const UNSEATED = "no-seat-holds-this-name"

function catching(): { readonly sending: Sending; readonly sent: Writing[] } {
  const held: Writing[] = []
  return {
    sending: (asked) => {
      held.push(asked)
      return Promise.resolve({ commit: "abc", wrote: ["one.ts"], took: [] })
    },
    sent: held,
  }
}

const never: Sending = () => {
  throw new Error("a message was sent that should have been refused")
}

test("a seat sends as the seat's own name", () => {
  expect(senderIn("01a0-wb", naming)).toBe("awen")
})

test("a subagent sends as the seat that ran the subagent", () => {
  expect(senderIn("01a0-gm--a4b3", naming)).toBe("iris")
})

test("an agent id naming no seat sends as nobody", () => {
  expect(senderIn(undefined, naming)).toBe(null)
  expect(senderIn("", naming)).toBe(null)
  expect(senderIn("01a0-gone", naming)).toBe(null)
  expect(senderIn("01a0-gone--a4b3", naming)).toBe(null)
})

test("a message to a seated seat is sent once as an announcement from the sender", async () => {
  const held = catching()
  const said = await sent({ to: TO, from: "awen", body: "may I know the tower yet?" }, held.sending)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toContain(`to ${TO} from awen`)
  expect(held.sent.length).toBe(1)
  const values = held.sent[0]?.pages?.[0]?.values
  expect(values?.from).toBe("awen")
  expect(values?.warrant).toBe("announce")
  expect(values?.body).toBe("may I know the tower yet?\n")
  expect(String(values?.to)).toContain(TO)
})

test("a message to a name no seat holds is refused and nothing is sent", async () => {
  const said = await sent({ to: UNSEATED, from: "awen", body: "hello" }, never)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain(`nothing was sent to \`${UNSEATED}\``)
  expect(said.refusals[0]).toContain("no seat holds the name")
})
