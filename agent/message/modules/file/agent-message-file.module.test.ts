import { expect, test } from "bun:test"
import { takingFor } from "akasha/agent/message/modules/file/agent-message-file.module.code.ts"

const AT = "agent/message/pages/agent-message-01a0/agent-message-01a0.agent-message.ts"

test("a take states the commit the checkout was at before the message was looked for", () => {
  const read = "b".repeat(40)
  const asked = takingFor("akasha", AT, read)
  expect(asked.removes).toEqual([AT])
  expect(asked.read).toBe(read)
})
