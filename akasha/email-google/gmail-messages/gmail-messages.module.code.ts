import { OperationalError } from "@akasha/errors-core/exit-code"
import type {
  ComposeInput,
  EmailLabelMutationResult,
  EmailMessage,
  EmailMessageSummary,
  EmailSendResult,
  ListMessagesQuery,
  ModifyLabelsInput,
} from "../email-shapes/email-shapes.module.code.ts"
import type { GmailClient } from "../gmail-client/gmail-client.module.code.ts"
import {
  getHeader,
  gmailMessageListSchema,
  gmailMessageSchema,
  gmailSendResponseSchema,
  normalizeLabelMutation,
  normalizeMessage,
  normalizeMessageSummary,
  type ParsedFullMessage,
} from "../gmail-schema/gmail-schema.module.code.ts"
import { buildMimeMessage, toBase64Url } from "../mime-message/mime-message.module.code.ts"

const SUMMARY_HEADERS = ["From", "To", "Subject", "Date"]

export const INBOX_LABEL = "INBOX"

export const SPAM_LABEL = "SPAM"

export const SENT_LABEL = "SENT"

export async function listMessageIdsByLabel(
  client: GmailClient,
  labelId: string,
  max: number
): Promise<readonly string[]> {
  const res = await client.raw.users.messages.list({
    userId: "me",
    labelIds: [labelId],
    maxResults: max,
  })
  const parsed = gmailMessageListSchema.parse(res.data)
  return (parsed.messages ?? []).map((ref) => ref.id)
}

export async function listMessages(
  client: GmailClient,
  query: ListMessagesQuery
): Promise<readonly EmailMessageSummary[]> {
  const res = await client.raw.users.messages.list({
    userId: "me",
    ...(query.query !== undefined ? { q: query.query } : {}),
    ...(query.max !== undefined ? { maxResults: query.max } : {}),
    ...(query.labelIds !== undefined && query.labelIds.length > 0
      ? { labelIds: [...query.labelIds] }
      : {}),
  })
  const parsed = gmailMessageListSchema.parse(res.data)
  const summaries: EmailMessageSummary[] = []
  for (const ref of parsed.messages ?? []) {
    const detail = await client.raw.users.messages.get({
      userId: "me",
      id: ref.id,
      format: "metadata",
      metadataHeaders: SUMMARY_HEADERS,
    })
    summaries.push(normalizeMessageSummary(detail.data))
  }
  return summaries
}

export async function getMessage(client: GmailClient, messageId: string): Promise<EmailMessage> {
  const res = await client.raw.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full",
  })
  return normalizeMessage(res.data)
}

export async function getRawMessage(
  client: GmailClient,
  messageId: string
): Promise<ParsedFullMessage> {
  const res = await client.raw.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full",
  })
  return gmailMessageSchema.parse(res.data)
}

interface ReplyHeaders {
  readonly inReplyTo: string | undefined
  readonly references: string | undefined
}

async function resolveReplyHeaders(
  client: GmailClient,
  replyToMessageId: string | undefined
): Promise<ReplyHeaders> {
  if (replyToMessageId === undefined) return { inReplyTo: undefined, references: undefined }
  const res = await client.raw.users.messages.get({
    userId: "me",
    id: replyToMessageId,
    format: "metadata",
    metadataHeaders: ["Message-ID", "References"],
  })
  const message = gmailMessageSchema.parse(res.data)
  const messageId = getHeader(message, "Message-ID")
  if (messageId === undefined) return { inReplyTo: undefined, references: undefined }
  const existing = getHeader(message, "References")
  return {
    inReplyTo: messageId,
    references: existing !== undefined ? `${existing} ${messageId}` : messageId,
  }
}

export async function buildRawEmail(client: GmailClient, input: ComposeInput): Promise<string> {
  const reply = await resolveReplyHeaders(client, input.replyToMessageId)
  const attachments = input.attachments ?? []
  const mime = buildMimeMessage({
    to: input.to,
    cc: input.cc,
    bcc: input.bcc,
    subject: input.subject,
    bodyText: input.body,
    inReplyTo: reply.inReplyTo,
    references: reply.references,
    from: input.from,
    ...(attachments.length > 0
      ? { multipart: { boundary: `temper-${crypto.randomUUID()}`, attachments } }
      : {}),
  })
  return toBase64Url(mime)
}

export async function sendMessage(
  client: GmailClient,
  input: ComposeInput
): Promise<EmailSendResult> {
  const raw = await buildRawEmail(client, input)
  const res = await client.raw.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
      ...(input.threadId !== undefined ? { threadId: input.threadId } : {}),
    },
  })
  const parsed = gmailSendResponseSchema.parse(res.data)
  return { id: parsed.id, threadId: parsed.threadId }
}

export interface LabelModificationBody {
  readonly addLabelIds?: readonly string[]
  readonly removeLabelIds?: readonly string[]
}

export function buildLabelModification(input: ModifyLabelsInput): LabelModificationBody {
  const add = input.addLabelIds ?? []
  const remove = input.removeLabelIds ?? []
  if (add.length === 0 && remove.length === 0)
    throw new OperationalError("at least one of --add or --remove is required")
  return {
    ...(add.length > 0 ? { addLabelIds: [...add] } : {}),
    ...(remove.length > 0 ? { removeLabelIds: [...remove] } : {}),
  }
}

export async function modifyMessageLabels(
  client: GmailClient,
  messageId: string,
  input: ModifyLabelsInput
): Promise<EmailLabelMutationResult> {
  const body = buildLabelModification(input)
  const res = await client.raw.users.messages.modify({
    userId: "me",
    id: messageId,
    requestBody: {
      ...(body.addLabelIds !== undefined ? { addLabelIds: [...body.addLabelIds] } : {}),
      ...(body.removeLabelIds !== undefined ? { removeLabelIds: [...body.removeLabelIds] } : {}),
    },
  })
  return normalizeLabelMutation(res.data)
}

export async function archiveMessage(
  client: GmailClient,
  messageId: string
): Promise<EmailLabelMutationResult> {
  return modifyMessageLabels(client, messageId, { removeLabelIds: [INBOX_LABEL] })
}

export async function trashMessage(
  client: GmailClient,
  messageId: string
): Promise<EmailLabelMutationResult> {
  const res = await client.raw.users.messages.trash({ userId: "me", id: messageId })
  return normalizeLabelMutation(res.data)
}
