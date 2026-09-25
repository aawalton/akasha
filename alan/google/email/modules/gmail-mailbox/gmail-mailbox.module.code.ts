import type { gmail_v1 } from "@googleapis/gmail"
import { makeGmailClient } from "akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"

const WANTED_HEADERS = [
  "From",
  "To",
  "Cc",
  "Subject",
  "List-Id",
  "List-Unsubscribe",
  "List-Unsubscribe-Post",
]

export interface Message {
  readonly id: string
  readonly threadId: string
  readonly from: string
  readonly fromAddress: string
  readonly to: string
  readonly cc: string
  readonly subject: string
  readonly listId: string
  readonly labelIds: readonly string[]
  readonly arrivedAt: Date
  readonly unsubscribe: string
  readonly oneClickUnsubscribe: boolean
}

export interface Mailbox {
  profile: () => Promise<{ readonly emailAddress: string; readonly historyId: string }>
  addedSince: (
    historyId: string
  ) => Promise<{ readonly ids: readonly string[]; readonly historyId: string } | null>
  inboxIds: () => Promise<readonly string[]>
  message: (id: string) => Promise<Message>
  rawOf: (id: string) => Promise<Buffer>
  modify: (
    id: string,
    change: { readonly add?: readonly string[]; readonly remove?: readonly string[] }
  ) => Promise<void>
  send: (message: Buffer) => Promise<void>
}

interface Answered<Data> {
  readonly data: Data
}

export interface MailboxClient {
  readonly raw: {
    readonly users: {
      readonly getProfile: (
        params: gmail_v1.Params$Resource$Users$Getprofile
      ) => Promise<Answered<gmail_v1.Schema$Profile>>
      readonly history: {
        readonly list: (
          params: gmail_v1.Params$Resource$Users$History$List
        ) => Promise<Answered<gmail_v1.Schema$ListHistoryResponse>>
      }
      readonly messages: {
        readonly list: (
          params: gmail_v1.Params$Resource$Users$Messages$List
        ) => Promise<Answered<gmail_v1.Schema$ListMessagesResponse>>
        readonly get: (
          params: gmail_v1.Params$Resource$Users$Messages$Get
        ) => Promise<Answered<gmail_v1.Schema$Message>>
        readonly modify: (
          params: gmail_v1.Params$Resource$Users$Messages$Modify
        ) => Promise<Answered<gmail_v1.Schema$Message>>
        readonly send: (
          params: gmail_v1.Params$Resource$Users$Messages$Send
        ) => Promise<Answered<gmail_v1.Schema$Message>>
      }
    }
  }
}

function isNotFound(error: unknown): boolean {
  return error instanceof Error && "status" in error && error.status === 404
}

async function orNotFound<Data>(call: Promise<Answered<Data>>): Promise<Data | "not-found"> {
  try {
    return (await call).data
  } catch (error) {
    if (isNotFound(error)) return "not-found"
    throw error
  }
}

function addressOf(header: string): string {
  const bare = firstCapture(/<([^<>]+)>/.exec(header)) ?? header
  return bare.trim().toLowerCase()
}

function decodeBase64Url(data: string): Buffer {
  return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64")
}

function encodeBase64Url(bytes: Buffer): string {
  return bytes.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export async function mailbox(client?: MailboxClient): Promise<Mailbox> {
  const users = (client ?? (await makeGmailClient())).raw.users

  return {
    async profile() {
      const got = (await users.getProfile({ userId: "me" })).data
      return { emailAddress: got.emailAddress ?? "", historyId: String(got.historyId ?? "") }
    },

    async addedSince(historyId) {
      const ids: string[] = []
      let latest = historyId
      let pageToken: string | undefined
      do {
        const page = await orNotFound(
          users.history.list({
            userId: "me",
            startHistoryId: historyId,
            historyTypes: ["messageAdded"],
            labelId: "INBOX",
            ...(pageToken !== undefined ? { pageToken } : {}),
          })
        )
        if (page === "not-found") return null
        for (const record of page.history ?? [])
          for (const added of record.messagesAdded ?? [])
            if (typeof added.message?.id === "string") ids.push(added.message.id)
        latest = String(page.historyId ?? latest)
        pageToken = page.nextPageToken ?? undefined
      } while (pageToken !== undefined)
      return { ids: [...new Set(ids)], historyId: latest }
    },

    async inboxIds() {
      const ids: string[] = []
      let pageToken: string | undefined
      do {
        const got = (
          await users.messages.list({
            userId: "me",
            labelIds: ["INBOX"],
            maxResults: 100,
            ...(pageToken !== undefined ? { pageToken } : {}),
          })
        ).data
        for (const one of got.messages ?? []) if (typeof one.id === "string") ids.push(one.id)
        pageToken = got.nextPageToken ?? undefined
      } while (pageToken !== undefined)
      return ids
    },

    async message(id) {
      const raw = await orNotFound(
        users.messages.get({
          userId: "me",
          id,
          format: "metadata",
          metadataHeaders: [...WANTED_HEADERS],
        })
      )
      if (raw === "not-found") throw new Error(`message ${id}: gone from the mailbox`)
      const header = (name: string): string =>
        raw.payload?.headers?.find((one) => (one.name ?? "").toLowerCase() === name)?.value ?? ""
      return {
        id,
        threadId: raw.threadId ?? "",
        from: header("from"),
        fromAddress: addressOf(header("from")),
        to: header("to"),
        cc: header("cc"),
        subject: header("subject"),
        listId: header("list-id"),
        labelIds: raw.labelIds ?? [],
        arrivedAt: new Date(Number(raw.internalDate ?? 0)),
        unsubscribe: header("list-unsubscribe"),
        oneClickUnsubscribe: header("list-unsubscribe-post") !== "",
      }
    },

    async rawOf(id) {
      const got = await orNotFound(users.messages.get({ userId: "me", id, format: "raw" }))
      if (got === "not-found") throw new Error(`message ${id}: gone from the mailbox`)
      return decodeBase64Url(got.raw ?? "")
    },

    async modify(id, change) {
      await orNotFound(
        users.messages.modify({
          userId: "me",
          id,
          requestBody: {
            addLabelIds: [...(change.add ?? [])],
            removeLabelIds: [...(change.remove ?? [])],
          },
        })
      )
    },

    async send(message) {
      const got = await orNotFound(
        users.messages.send({ userId: "me", requestBody: { raw: encodeBase64Url(message) } })
      )
      if (got === "not-found") throw new Error("send: Gmail answered 404, so nothing was sent")
    },
  }
}
