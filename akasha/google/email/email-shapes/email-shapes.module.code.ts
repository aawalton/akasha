import type { MimeAttachment } from "../mime-message/mime-message.module.code.ts"

export interface ListMessagesQuery {
  readonly query?: string
  readonly max?: number
  readonly labelIds?: readonly string[]
}

export interface ComposeInput {
  readonly to: readonly string[]
  readonly cc?: readonly string[]
  readonly bcc?: readonly string[]
  readonly subject: string
  readonly body: string
  readonly threadId?: string
  readonly replyToMessageId?: string
  readonly from?: { readonly name: string; readonly email: string }
  readonly attachments?: readonly MimeAttachment[]
}

export interface EmailMessageSummary {
  readonly id: string
  readonly threadId: string | undefined
  readonly from: string | undefined
  readonly to: string | undefined
  readonly subject: string | undefined
  readonly date: string | undefined
  readonly snippet: string | undefined
}

export interface EmailMessage extends EmailMessageSummary {
  readonly body: string | undefined
}

export interface EmailDraft {
  readonly id: string
  readonly messageId: string | undefined
  readonly threadId: string | undefined
}

export interface EmailSendResult {
  readonly id: string
  readonly threadId: string | undefined
}

export interface ModifyLabelsInput {
  readonly addLabelIds?: readonly string[]
  readonly removeLabelIds?: readonly string[]
}

export interface EmailLabelMutationResult {
  readonly id: string
  readonly threadId: string | undefined
  readonly labelIds: readonly string[] | undefined
}
