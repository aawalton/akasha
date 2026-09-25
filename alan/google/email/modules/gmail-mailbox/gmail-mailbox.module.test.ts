import { expect, test } from "bun:test"
import {
  type MailboxClient,
  mailbox,
} from "akasha/alan/google/email/modules/gmail-mailbox/gmail-mailbox.module.code.ts"

interface Call {
  readonly method: string
  readonly params: unknown
}

type Answer = (params: unknown) => unknown

function notFound(): Error {
  return Object.assign(new Error("Requested entity was not found."), { status: 404 })
}

function standIn(answers: Readonly<Record<string, Answer>>): {
  readonly client: MailboxClient
  readonly calls: Call[]
} {
  const calls: Call[] = []
  async function answer(method: string, params: unknown): Promise<{ readonly data: never }> {
    calls.push({ method, params })
    const reply = answers[method]
    if (reply === undefined) throw new Error(`the stand-in has no answer for ${method}`)
    return { data: reply(params) as never }
  }
  const client: MailboxClient = {
    raw: {
      users: {
        getProfile: (params) => answer("getProfile", params),
        history: { list: (params) => answer("history.list", params) },
        messages: {
          list: (params) => answer("messages.list", params),
          get: (params) => answer("messages.get", params),
          modify: (params) => answer("messages.modify", params),
          send: (params) => answer("messages.send", params),
        },
      },
    },
  }
  return { client, calls }
}

test("a profile says the address and the history id", async () => {
  const { client } = standIn({
    getProfile: () => ({ emailAddress: "alan@example.com", historyId: "42" }),
  })
  const box = await mailbox(client)
  expect(await box.profile()).toEqual({ emailAddress: "alan@example.com", historyId: "42" })
})

test("what arrived since a history id follows every page and names each message once", async () => {
  const { client, calls } = standIn({
    "history.list": (params) =>
      (params as { pageToken?: string }).pageToken === undefined
        ? {
            history: [{ messagesAdded: [{ message: { id: "a" } }, { message: { id: "b" } }] }],
            historyId: "50",
            nextPageToken: "next",
          }
        : { history: [{ messagesAdded: [{ message: { id: "b" } }] }], historyId: "51" },
  })
  const box = await mailbox(client)
  expect(await box.addedSince("40")).toEqual({ ids: ["a", "b"], historyId: "51" })
  expect(calls.map((one) => one.params)).toEqual([
    {
      userId: "me",
      startHistoryId: "40",
      historyTypes: ["messageAdded"],
      labelId: "INBOX",
    },
    {
      userId: "me",
      startHistoryId: "40",
      historyTypes: ["messageAdded"],
      labelId: "INBOX",
      pageToken: "next",
    },
  ])
})

test("a history id Gmail no longer has answers as nothing", async () => {
  const { client } = standIn({
    "history.list": () => {
      throw notFound()
    },
  })
  const box = await mailbox(client)
  expect(await box.addedSince("1")).toBeNull()
})

test("a fault other than a missing history id is thrown", async () => {
  const { client } = standIn({
    "history.list": () => {
      throw Object.assign(new Error("Forbidden"), { status: 403 })
    },
  })
  const box = await mailbox(client)
  await expect(box.addedSince("1")).rejects.toThrow("Forbidden")
})

test("the inbox is listed a hundred at a time across every page", async () => {
  const { client, calls } = standIn({
    "messages.list": (params) =>
      (params as { pageToken?: string }).pageToken === undefined
        ? { messages: [{ id: "a" }, { id: "b" }], nextPageToken: "next" }
        : { messages: [{ id: "c" }] },
  })
  const box = await mailbox(client)
  expect(await box.inboxIds()).toEqual(["a", "b", "c"])
  expect(calls.map((one) => one.params)).toEqual([
    { userId: "me", labelIds: ["INBOX"], maxResults: 100 },
    { userId: "me", labelIds: ["INBOX"], maxResults: 100, pageToken: "next" },
  ])
})

test("a summary is built from the seven headers the mailbox asks for", async () => {
  const { client, calls } = standIn({
    "messages.get": () => ({
      threadId: "t1",
      labelIds: ["INBOX", "UNREAD"],
      internalDate: "1700000000000",
      payload: {
        headers: [
          { name: "From", value: "Someone <Someone@Example.com>" },
          { name: "To", value: "alan@example.com" },
          { name: "Subject", value: "Hello" },
          { name: "List-Id", value: "<news.example.com>" },
          { name: "List-Unsubscribe", value: "<https://example.com/u>" },
          { name: "List-Unsubscribe-Post", value: "List-Unsubscribe=One-Click" },
        ],
      },
    }),
  })
  const box = await mailbox(client)
  expect(await box.message("m1")).toEqual({
    id: "m1",
    threadId: "t1",
    from: "Someone <Someone@Example.com>",
    fromAddress: "someone@example.com",
    to: "alan@example.com",
    cc: "",
    subject: "Hello",
    listId: "<news.example.com>",
    labelIds: ["INBOX", "UNREAD"],
    arrivedAt: new Date(1700000000000),
    unsubscribe: "<https://example.com/u>",
    oneClickUnsubscribe: true,
  })
  expect(calls[0]?.params).toEqual({
    userId: "me",
    id: "m1",
    format: "metadata",
    metadataHeaders: [
      "From",
      "To",
      "Cc",
      "Subject",
      "List-Id",
      "List-Unsubscribe",
      "List-Unsubscribe-Post",
    ],
  })
})

test("a message gone from the mailbox is a fault naming the message", async () => {
  const { client } = standIn({
    "messages.get": () => {
      throw notFound()
    },
  })
  const box = await mailbox(client)
  await expect(box.message("m1")).rejects.toThrow("message m1: gone from the mailbox")
  await expect(box.rawOf("m1")).rejects.toThrow("message m1: gone from the mailbox")
})

test("raw bytes are the message Gmail holds, byte for byte", async () => {
  const bytes = Buffer.from([0, 1, 2, 250, 251, 252, 253, 254, 255])
  const { client, calls } = standIn({
    "messages.get": () => ({ raw: bytes.toString("base64url") }),
  })
  const box = await mailbox(client)
  expect(await box.rawOf("m1")).toEqual(bytes)
  expect(calls[0]?.params).toEqual({ userId: "me", id: "m1", format: "raw" })
})

test("a relabelling names every label added and removed", async () => {
  const { client, calls } = standIn({ "messages.modify": () => ({}) })
  const box = await mailbox(client)
  await box.modify("m1", { add: ["STARRED"] })
  expect(calls[0]?.params).toEqual({
    userId: "me",
    id: "m1",
    requestBody: { addLabelIds: ["STARRED"], removeLabelIds: [] },
  })
})

test("bytes are sent unchanged", async () => {
  const bytes = Buffer.from("From: a@example.com\r\nSubject: ÿ\r\n\r\nbody", "utf-8")
  const { client, calls } = standIn({ "messages.send": () => ({ id: "s1" }) })
  const box = await mailbox(client)
  await box.send(bytes)
  const sent = (calls[0]?.params as { requestBody: { raw: string } }).requestBody.raw
  expect(Buffer.from(sent, "base64url")).toEqual(bytes)
  expect(sent).not.toContain("=")
})

test("a send Gmail answers as not found says nothing was sent", async () => {
  const { client } = standIn({
    "messages.send": () => {
      throw notFound()
    },
  })
  const box = await mailbox(client)
  await expect(box.send(Buffer.from("x"))).rejects.toThrow("nothing was sent")
})
