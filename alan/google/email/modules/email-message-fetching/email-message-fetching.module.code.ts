import type {
  EmailMessage,
  EmailMessageSummary,
  ListMessagesQuery,
} from "akasha/alan/google/email/modules/email-shapes/email-shapes.module.code.ts"
import type { GmailClient } from "akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"
import {
  getMessage as getGmailMessage,
  listMessages as listGmailMessages,
} from "akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts"

export interface MessageWanted {
  readonly id: string
}

export async function listMessages(
  asked: ListMessagesQuery
): Promise<readonly EmailMessageSummary[]> {
  return listGmailMessages(await gmailClient(), asked)
}

export async function getMessage(asked: MessageWanted): Promise<EmailMessage> {
  return getGmailMessage(await gmailClient(), asked.id)
}

async function gmailClient(): Promise<GmailClient> {
  const { makeGmailClient } = await import(
    "akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"
  )
  return makeGmailClient()
}
