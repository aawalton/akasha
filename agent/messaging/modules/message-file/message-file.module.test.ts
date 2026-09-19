import { afterEach, expect, test } from "bun:test"
import {
  recipientRefused,
  type Sending,
  writeMessage,
} from "akasha/agent/messaging/modules/message-file/message-file.module.code.ts"
import { akashaSeatsThatExist } from "akasha/agent/seat/page/modules/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { IN_CLUSTER } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const TO = [...akashaSeatsThatExist().values()].sort()[0] ?? ""

const FROM = "message-file-test"

afterEach(() => {
  delete process.env[IN_CLUSTER]
})

function catching(): { readonly sending: Sending; readonly sent: Writing[] } {
  const sent: Writing[] = []
  return {
    sending: (asked) => {
      sent.push(asked)
      return Promise.resolve({ commit: "abc", wrote: ["one.ts"], took: [] })
    },
    sent,
  }
}

const refusing: Sending = () => Promise.resolve({ refused: "the pages would not take it" })

const never: Sending = () => {
  throw new Error("a message on the workstation was sent to the pages service")
}

test("a message addressed to nobody is refused before anything is composed", async () => {
  expect(recipientRefused("")).not.toBe(null)
  const said = await writeMessage({ to: "", from: FROM, warrant: "announce", body: "hi" }, never)
  expect(said.kind).toBe("refused")
})

test("a message a run in the cluster writes is sent to the pages service", async () => {
  process.env[IN_CLUSTER] = "1"
  const held = catching()
  const said = await writeMessage(
    { to: TO, from: FROM, warrant: "announce", body: "a check turned." },
    held.sending
  )
  expect(said.kind).toBe("written")
  expect(held.sent.length).toBe(1)
  const page = held.sent[0]?.pages?.[0]
  expect(page?.pageTypeSlug).toBe("message")
  expect(page?.values.from).toBe(FROM)
  expect(page?.values.body).toBe("a check turned.\n")
  expect(String(page?.values.to)).toContain(TO)
})

test("a message the pages refused is refused with what the pages said", async () => {
  process.env[IN_CLUSTER] = "1"
  const said = await writeMessage(
    { to: TO, from: FROM, warrant: "announce", body: "a check turned." },
    refusing
  )
  expect(said.kind).toBe("refused")
  expect(said.kind === "refused" && said.detail).toContain("would not take it")
})

test("the message named in the answer is the page that was sent", async () => {
  process.env[IN_CLUSTER] = "1"
  const held = catching()
  const said = await writeMessage(
    { to: TO, from: FROM, warrant: "announce", body: "a check turned." },
    held.sending
  )
  expect(said.kind === "written" && said.relPath).toContain(
    said.kind === "written" ? said.id : "nothing"
  )
  expect(held.sent[0]?.pages?.[0]?.slug).toBe(said.kind === "written" ? said.id : "")
})
