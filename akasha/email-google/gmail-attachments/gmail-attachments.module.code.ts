import { readFile } from "node:fs/promises"
import { basename } from "node:path"
import type { GmailClient } from "../gmail-client/gmail-client.module.code.ts"
import {
  type GmailMessagePart,
  gmailBodySchema,
  type ParsedFullMessage,
} from "../gmail-schema/gmail-schema.module.code.ts"
import type { MimeAttachment } from "../mime-message/mime-message.module.code.ts"

export interface AttachmentRef {
  readonly filename: string
  readonly mimeType: string
  readonly attachmentId: string
  readonly size: number | undefined
}

function collect(part: GmailMessagePart | undefined): readonly AttachmentRef[] {
  if (part === undefined) return []
  const here: AttachmentRef[] = []
  const filename = part.filename
  const attachmentId = part.body?.attachmentId
  if (filename !== undefined && filename.length > 0 && attachmentId !== undefined) {
    here.push({
      filename,
      mimeType: part.mimeType ?? "application/octet-stream",
      attachmentId,
      size: part.body?.size,
    })
  }
  for (const child of part.parts ?? []) here.push(...collect(child))
  return here
}

export function listAttachments(message: ParsedFullMessage): readonly AttachmentRef[] {
  return collect(message.payload)
}

export async function getAttachment(
  client: GmailClient,
  messageId: string,
  attachmentId: string
): Promise<{ data: string; size: number | undefined }> {
  const res = await client.raw.users.messages.attachments.get({
    userId: "me",
    messageId,
    id: attachmentId,
  })
  const parsed = gmailBodySchema.parse(res.data)
  return { data: parsed.data ?? "", size: parsed.size }
}

export async function loadAttachmentFile(path: string): Promise<MimeAttachment> {
  const bytes = await readFile(path)
  return {
    filename: basename(path),
    contentType: Bun.file(path).type,
    contentBase64: bytes.toString("base64"),
  }
}
