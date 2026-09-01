import { OperationalError } from "@akasha/errors-core/exit-code"
import type { z } from "zod"
import type { GmailClient } from "../gmail-client/gmail-client.module.code.ts"
import {
  gmailHistoryListSchema,
  gmailProfileSchema,
} from "../gmail-schema/gmail-schema.module.code.ts"

type ParsedHistoryList = z.infer<typeof gmailHistoryListSchema>

export function extractMessageIds(parsed: ParsedHistoryList): readonly string[] {
  const ids: string[] = []
  for (const entry of parsed.history ?? []) {
    for (const added of entry.messagesAdded ?? []) {
      const id = added.message?.id
      if (id !== undefined) ids.push(id)
    }
  }
  return ids
}

export async function getProfile(
  client: GmailClient
): Promise<{ emailAddress: string; historyId: string }> {
  const res = await client.raw.users.getProfile({ userId: "me" })
  const parsed = gmailProfileSchema.parse(res.data)
  if (parsed.emailAddress === undefined || parsed.historyId === undefined) {
    throw new OperationalError("getProfile: Gmail returned no emailAddress / historyId")
  }
  return { emailAddress: parsed.emailAddress, historyId: parsed.historyId }
}

export type HistoryResult =
  | {
      readonly status: "ok"
      readonly messageIds: readonly string[]
      readonly latestHistoryId: string
    }
  | { readonly status: "stale" }

function isStatusCode(err: unknown, status: number): boolean {
  if (err === null || typeof err !== "object") return false
  if ("code" in err && err.code === status) return true
  if ("status" in err && err.status === status) return true
  if ("statusCode" in err && err.statusCode === status) return true
  if ("response" in err) {
    const response = err.response
    if (response !== null && typeof response === "object") {
      if ("status" in response && response.status === status) return true
      if ("statusCode" in response && response.statusCode === status) return true
    }
  }
  return false
}

export async function listNewMessageIds(
  client: GmailClient,
  startHistoryId: string
): Promise<HistoryResult> {
  const messageIds = new Set<string>()
  let latestHistoryId = startHistoryId
  let pageToken: string | undefined

  try {
    do {
      const res = await client.raw.users.history.list({
        userId: "me",
        startHistoryId,
        historyTypes: ["messageAdded"],
        maxResults: 500,
        ...(pageToken !== undefined ? { pageToken } : {}),
      })
      const parsed = gmailHistoryListSchema.parse(res.data)
      for (const id of extractMessageIds(parsed)) messageIds.add(id)
      if (parsed.historyId !== undefined) latestHistoryId = parsed.historyId
      pageToken = parsed.nextPageToken
    } while (pageToken !== undefined)
  } catch (err) {
    if (isStatusCode(err, 404)) return { status: "stale" }
    throw err
  }

  return { status: "ok", messageIds: [...messageIds], latestHistoryId }
}
