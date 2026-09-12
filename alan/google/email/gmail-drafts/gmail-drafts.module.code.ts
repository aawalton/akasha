import type {
  ComposeInput,
  EmailDraft,
} from "akasha/alan/google/email/email-shapes/email-shapes.module.code.ts"
import type { GmailClient } from "akasha/alan/google/email/gmail-client/gmail-client.module.code.ts"
import { buildRawEmail } from "akasha/alan/google/email/gmail-messages/gmail-messages.module.code.ts"
import {
  gmailDraftsListSchema,
  normalizeDraft,
} from "akasha/alan/google/email/gmail-schema/gmail-schema.module.code.ts"

export function draftedSaid(to: readonly string[]): string {
  return `gmail holds a new draft to ${to.join(", ")}`
}

export async function createDraft(
  client: GmailClient,
  input: ComposeInput,
  done: string[] = []
): Promise<EmailDraft> {
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
  done.push(draftedSaid(input.to))
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
