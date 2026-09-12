import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Named } from "akasha/commands/pages/sms/send/sms-send.command.code.ts"
import { sentBy, sentSaid } from "akasha/commands/pages/sms/send/sms-send.command.code.ts"

const NAMED: Named = {
  apiKey: "not-a-key",
  from: "+15550000000",
  to: "+15551111111",
  text: "hello",
  baseUrl: undefined,
  json: false,
}

const TOOK = sentSaid(NAMED.to)

function answering(status: number, body: string): () => Promise<Response> {
  return async () => await Promise.resolve(new Response(body, { status }))
}

test("a carrier that took the message and answered nothing readable names the send it refuses over", async () => {
  const answer = await sentBy(NAMED, answering(200, "not json"))

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals.some((one) => one.includes(TOOK))).toBe(true)
})

test("a carrier that took the message and answered a shape nothing reads names the send too", async () => {
  const answer = await sentBy(NAMED, answering(200, "{}"))

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals.some((one) => one.includes(TOOK))).toBe(true)
})

test("a carrier that refused the message says nothing about a message it took", async () => {
  const answer = await sentBy(NAMED, answering(422, "{}"))

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals.some((one) => one.includes("took the message"))).toBe(false)
})

test("a send the carrier took says so rather than saying it may have been taken", () => {
  expect(TOOK).not.toContain("may")
})

test("a carrier that took the message answers the id it gave rather than a refusal", async () => {
  const answer = await sentBy(NAMED, answering(200, JSON.stringify({ data: { id: "msg-1" } })))

  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toContain("msg-1")
})
