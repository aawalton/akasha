import * as z from "zod"
import type {
  EmailDraft,
  EmailLabelMutationResult,
  EmailMessage,
  EmailMessageSummary,
} from "../email-shapes/email-shapes.module.code.ts"
import { fromBase64Url } from "../mime-message/mime-message.module.code.ts"

export const gmailMessageRefSchema = z
  .object({
    id: z.string(),
    threadId: z.string().optional(),
  })
  .passthrough()

export const gmailMessageListSchema = z
  .object({
    messages: z.array(gmailMessageRefSchema).optional(),
    nextPageToken: z.string().optional(),
    resultSizeEstimate: z.number().optional(),
  })
  .passthrough()

const gmailHeaderSchema = z
  .object({
    name: z.string(),
    value: z.string(),
  })
  .passthrough()

export const gmailBodySchema = z
  .object({
    data: z.string().optional(),
    size: z.number().optional(),
    attachmentId: z.string().optional(),
  })
  .passthrough()

export interface GmailMessagePart {
  readonly mimeType?: string | undefined
  readonly filename?: string | undefined
  readonly headers?: readonly { readonly name: string; readonly value: string }[] | undefined
  readonly body?:
    | {
        readonly data?: string | undefined
        readonly size?: number | undefined
        readonly attachmentId?: string | undefined
      }
    | undefined
  readonly parts?: readonly GmailMessagePart[] | undefined
}

export const gmailMessagePartSchema: z.ZodType<GmailMessagePart> = z.lazy(() =>
  z
    .object({
      mimeType: z.string().optional(),
      filename: z.string().optional(),
      headers: z.array(gmailHeaderSchema).optional(),
      body: gmailBodySchema.optional(),
      parts: z.array(gmailMessagePartSchema).optional(),
    })
    .passthrough()
)

export const gmailMessageSchema = z
  .object({
    id: z.string(),
    threadId: z.string().optional(),
    labelIds: z.array(z.string()).optional(),
    snippet: z.string().optional(),
    internalDate: z.string().optional(),
    payload: gmailMessagePartSchema.optional(),
  })
  .passthrough()

export const gmailDraftSchema = z
  .object({
    id: z.string(),
    message: gmailMessageRefSchema.optional(),
  })
  .passthrough()

export const gmailDraftsListSchema = z
  .object({
    drafts: z.array(gmailDraftSchema).optional(),
    nextPageToken: z.string().optional(),
    resultSizeEstimate: z.number().optional(),
  })
  .passthrough()

export const gmailSendResponseSchema = z
  .object({
    id: z.string(),
    threadId: z.string().optional(),
    labelIds: z.array(z.string()).optional(),
  })
  .passthrough()

export const gmailLabelMutationResponseSchema = z
  .object({
    id: z.string(),
    threadId: z.string().optional(),
    labelIds: z.array(z.string()).optional(),
  })
  .passthrough()

type ParsedGmailMessage = z.infer<typeof gmailMessageSchema>

export type ParsedFullMessage = z.infer<typeof gmailMessageSchema>

export const gmailProfileSchema = z
  .object({
    emailAddress: z.string().optional(),
    historyId: z.string().optional(),
  })
  .passthrough()

export const gmailHistoryListSchema = z
  .object({
    history: z
      .array(
        z
          .object({
            messagesAdded: z
              .array(z.object({ message: gmailMessageRefSchema.optional() }).passthrough())
              .optional(),
          })
          .passthrough()
      )
      .optional(),
    historyId: z.string().optional(),
    nextPageToken: z.string().optional(),
  })
  .passthrough()

export function getHeader(message: ParsedGmailMessage, name: string): string | undefined {
  const lower = name.toLowerCase()
  return message.payload?.headers?.find((h) => h.name.toLowerCase() === lower)?.value
}

export function extractPlainTextBody(part: GmailMessagePart | undefined): string | undefined {
  if (part === undefined) return undefined
  if (part.mimeType === "text/plain" && part.body?.data !== undefined)
    return fromBase64Url(part.body.data)
  for (const child of part.parts ?? []) {
    const found = extractPlainTextBody(child)
    if (found !== undefined) return found
  }
  return undefined
}

function summarize(message: ParsedGmailMessage): EmailMessageSummary {
  return {
    id: message.id,
    threadId: message.threadId,
    from: getHeader(message, "From"),
    to: getHeader(message, "To"),
    subject: getHeader(message, "Subject"),
    date: getHeader(message, "Date"),
    snippet: message.snippet,
  }
}

export function normalizeMessageSummary(raw: unknown): EmailMessageSummary {
  return summarize(gmailMessageSchema.parse(raw))
}

export function normalizeMessage(raw: unknown): EmailMessage {
  const message = gmailMessageSchema.parse(raw)
  return { ...summarize(message), body: extractPlainTextBody(message.payload) }
}

export function normalizeDraft(raw: unknown): EmailDraft {
  const draft = gmailDraftSchema.parse(raw)
  return { id: draft.id, messageId: draft.message?.id, threadId: draft.message?.threadId }
}

export function normalizeLabelMutation(raw: unknown): EmailLabelMutationResult {
  const message = gmailLabelMutationResponseSchema.parse(raw)
  return { id: message.id, threadId: message.threadId, labelIds: message.labelIds }
}
