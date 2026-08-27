import type { GmailClient } from "./client"
import { buildRawEmail } from "./messages"
import { gmailDraftsListSchema, normalizeDraft } from "./schema"
import type { ComposeInput, EmailDraft } from "./types"

export async function createDraft(client: GmailClient, input: ComposeInput): Promise<EmailDraft> {
  const raw = await buildRawEmail(client, input)
  const res = await client.raw.users.drafts.create({
    userId: "me",
    requestBody: {
      message: {
        raw,
        ...(input.threadId !== undefined ? { threadId: input.threadId } : {}),
      },
    },
  })
  return normalizeDraft(res.data)
}

export async function listDrafts(
  client: GmailClient,
  max?: number
): Promise<readonly EmailDraft[]> {
  const res = await client.raw.users.drafts.list({
    userId: "me",
    ...(max !== undefined ? { maxResults: max } : {}),
  })
  const parsed = gmailDraftsListSchema.parse(res.data)
  return (parsed.drafts ?? []).map((draft) => normalizeDraft(draft))
}
