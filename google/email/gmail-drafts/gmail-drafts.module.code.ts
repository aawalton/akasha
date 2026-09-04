import type { ComposeInput, EmailDraft } from "../email-shapes/email-shapes.module.code.ts"
import type { GmailClient } from "../gmail-client/gmail-client.module.code.ts"
import { buildRawEmail } from "../gmail-messages/gmail-messages.module.code.ts"
import { gmailDraftsListSchema, normalizeDraft } from "../gmail-schema/gmail-schema.module.code.ts"

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
