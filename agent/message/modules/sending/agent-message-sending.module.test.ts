import { expect, test } from "bun:test"
import {
  pageBytesFor,
  recipientRefused,
  type Sending,
  writeMessage,
} from "akasha/agent/message/modules/sending/agent-message-sending.module.code.ts"
import { akashaSeatsThatExist } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { CEILING } from "akasha/check/code/pages/file-length/modules/length-ceiling/length-ceiling.module.code.ts"
import {
  AKASHA,
  akashaRoot,
  rootEnvName,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { composedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const ROOT_ENV = rootEnvName(AKASHA)

const TO = [...akashaSeatsThatExist().values()].sort()[0] ?? ""

const FROM = "message-sending-test"

function catching(): { readonly sending: Sending; readonly sent: Writing[] } {
  const sent: Writing[] = []
  return {
    sending: (asked) => {
      sent.push(asked)
      const wrote = (asked.pages ?? []).map(
        (one) => `agent/message/pages/${one.slug}.${one.pageTypeSlug}.ts`
      )
      return Promise.resolve({ commit: "abc", wrote, took: [] })
    },
    sent,
  }
}

const refusing: Sending = () => Promise.resolve({ refused: "the pages would not take it" })

const never: Sending = () => {
  throw new Error("a message addressed to nobody was sent")
}

test("a message addressed to nobody is refused before anything is composed", async () => {
  expect(recipientRefused("")).not.toBe(null)
  const said = await writeMessage({ to: "", from: FROM, warrant: "announce", body: "hi" }, never)
  expect(said.kind).toBe("refused")
})

test("a message to a seat no page holds is refused unless that seat is started on demand", async () => {
  const to = "no-seat-holds-this-name"
  const refused = await writeMessage({ to, from: FROM, warrant: "announce", body: "hi" }, never)
  expect(refused.kind).toBe("refused")
  const held = catching()
  const said = await writeMessage(
    { to, from: FROM, warrant: "announce", body: "hi", startedOnDemand: true },
    held.sending
  )
  expect(said.kind).toBe("written")
  expect(String(held.sent[0]?.pages?.[0]?.values.to)).toContain(to)
})

test("a message is sent to the pages service wherever the sender runs", async () => {
  const held = catching()
  const said = await writeMessage(
    { to: TO, from: FROM, warrant: "announce", body: "a check turned." },
    held.sending
  )
  expect(said.kind).toBe("written")
  expect(held.sent.length).toBe(1)
  const page = held.sent[0]?.pages?.[0]
  expect(page?.pageTypeSlug).toBe("agent-message")
  expect(page?.values.from).toBe(FROM)
  expect(page?.values.body).toBe("a check turned.\n")
  expect(String(page?.values.to)).toContain(TO)
})

test("a message the pages refused is refused with what the pages said", async () => {
  const said = await writeMessage(
    { to: TO, from: FROM, warrant: "announce", body: "a check turned." },
    refusing
  )
  expect(said.kind).toBe("refused")
  expect(said.kind === "refused" && said.detail).toContain("would not take it")
})

test("the message named in the answer is the page that was sent", async () => {
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

test("a message is written from a checkout holding no index, as the web app's is", async () => {
  const was = process.env[ROOT_ENV]
  process.env[ROOT_ENV] = "/no-checkout-is-here"
  try {
    const held = catching()
    const said = await writeMessage(
      { to: TO, from: FROM, warrant: "announce", body: "look left.", startedOnDemand: true },
      held.sending
    )
    expect(said.kind).toBe("written")
    expect(held.sent[0]?.pages?.[0]?.pageTypeSlug).toBe("agent-message")
  } finally {
    if (was === undefined) delete process.env[ROOT_ENV]
    else process.env[ROOT_ENV] = was
  }
})

test("a message whose page would be over the byte ceiling is refused rather than sent", async () => {
  const body = "a".repeat(CEILING)
  const said = await writeMessage({ to: TO, from: FROM, warrant: "announce", body }, never)
  expect(said.kind).toBe("refused")
})

test("a page's bytes are reckoned at no fewer than the composed page holds", async () => {
  const held = catching()
  const body = 'she said "wait"\n\tthen\\left, café.\n'.repeat(40)
  await writeMessage({ to: TO, from: FROM, warrant: "announce", body }, held.sending)
  const page = held.sent[0]?.pages?.[0]
  if (page === undefined) throw new Error("no page was sent")
  const composed = composedFor(akashaRoot(), page)
  if ("refused" in composed) throw new Error(composed.refused)
  const made = new TextEncoder().encode(composed.put.content).byteLength
  expect(pageBytesFor(page)).toBeGreaterThanOrEqual(made)
})
