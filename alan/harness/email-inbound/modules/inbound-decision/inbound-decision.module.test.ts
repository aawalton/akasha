import { expect, test } from "bun:test"
import { decide } from "akasha/alan/harness/email-inbound/modules/inbound-decision/inbound-decision.module.code.ts"
import type { InboundMessage } from "akasha/alan/harness/email-inbound/modules/inbound-message/inbound-message.module.code.ts"

const ARRIVING: InboundMessage = {
  from: "Someone <someone@example.com>",
  fromAddress: "someone@example.com",
  fromDomain: "example.com",
  subject: "hello",
  to: "claudius@alanwalton.com",
  isFromSelf: false,
  addressedAgentHandle: "claudius",
  senderHandler: undefined,
  hasListUnsubscribe: false,
  isSpam: false,
  isSent: false,
}

const LEFT_TO_THE_RULES = "surface"

test("a message on a persona channel Alan sent is handed to that persona", () => {
  const way = decide({ ...ARRIVING, isSent: true, isFromSelf: true })
  expect(way.action).toBe("agent-handle")
  expect(way.agentHandle).toBe("claudius")
})

test("a message on a persona channel from a sender handed to a seat is handed to that seat", () => {
  const way = decide({ ...ARRIVING, senderHandler: "jenny" })
  expect(way.action).toBe("agent-handle")
  expect(way.agentHandle).toBe("jenny")
})

test("a message on a persona channel Alan sent goes to the persona even from a handed sender", () => {
  const way = decide({ ...ARRIVING, isSent: true, senderHandler: "jenny" })
  expect(way.agentHandle).toBe("claudius")
})

test("a message on a persona channel from anyone else is discarded", () => {
  const way = decide(ARRIVING)
  expect(way.action).toBe("discard")
  expect(way.agentHandle).toBe(undefined)
})

test("a message on no persona channel is left to the rules, whoever sent it", () => {
  const way = decide({ ...ARRIVING, addressedAgentHandle: undefined, senderHandler: "jenny" })
  expect(way.action).toBe(LEFT_TO_THE_RULES)
  expect(way.agentHandle).toBe(undefined)
})
