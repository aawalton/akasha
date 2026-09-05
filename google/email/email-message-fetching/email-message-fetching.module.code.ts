import { emailGoogle } from "../email-operations/email-operations.module.code.ts"
import type {
  EmailMessage,
  EmailMessageSummary,
  ListMessagesQuery,
} from "../email-shapes/email-shapes.module.code.ts"

export interface MessageWanted {
  readonly id: string
}

export async function listMessages(
  asked: ListMessagesQuery
): Promise<readonly EmailMessageSummary[]> {
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  return google.listMessages(client, asked)
}

export async function getMessage(asked: MessageWanted): Promise<EmailMessage> {
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  return google.getMessage(client, asked.id)
}
