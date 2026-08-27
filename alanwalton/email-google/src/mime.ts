export interface MimeAttachment {
  readonly filename: string
  readonly contentType: string
  readonly contentBase64: string
}

export interface MimeMessageInput {
  readonly to: readonly string[]
  readonly cc?: readonly string[]
  readonly bcc?: readonly string[]
  readonly subject: string
  readonly bodyText: string
  readonly inReplyTo?: string
  readonly references?: string
  readonly from?: { readonly name: string; readonly email: string }
  readonly multipart?: {
    readonly boundary: string
    readonly attachments: readonly MimeAttachment[]
  }
}

const NON_ASCII = /[^\x20-\x7e]/

export function encodeHeaderText(value: string): string {
  if (!NON_ASCII.test(value)) return value
  return `=?UTF-8?B?${Buffer.from(value, "utf-8").toString("base64")}?=`
}

const TEXT_PART_HEADERS =
  'Content-Type: text/plain; charset="utf-8"\r\nContent-Transfer-Encoding: 8bit'

const BASE64_LINE_LENGTH = 76

function wrapBase64(payload: string): string {
  const lines: string[] = []
  for (let i = 0; i < payload.length; i += BASE64_LINE_LENGTH)
    lines.push(payload.slice(i, i + BASE64_LINE_LENGTH))
  return lines.join("\r\n")
}

function dispositionFilename(filename: string): string {
  if (NON_ASCII.test(filename)) return `filename*=UTF-8''${encodeRFC2231(filename)}`
  return `filename="${filename.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
}

function encodeRFC2231(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  )
}

function attachmentPart(attachment: MimeAttachment): string {
  const headers = [
    `Content-Type: ${attachment.contentType}`,
    "Content-Transfer-Encoding: base64",
    `Content-Disposition: attachment; ${dispositionFilename(attachment.filename)}`,
  ]
  return `${headers.join("\r\n")}\r\n\r\n${wrapBase64(attachment.contentBase64)}`
}

export function buildMimeMessage(input: MimeMessageInput): string {
  const multipart = input.multipart
  const headers: string[] = []
  if (input.from !== undefined) {
    const name = encodeHeaderText(input.from.name)
    headers.push(
      name.length > 0 ? `From: ${name} <${input.from.email}>` : `From: ${input.from.email}`
    )
  }
  headers.push(`To: ${input.to.join(", ")}`)
  if (input.cc !== undefined && input.cc.length > 0) headers.push(`Cc: ${input.cc.join(", ")}`)
  if (input.bcc !== undefined && input.bcc.length > 0) headers.push(`Bcc: ${input.bcc.join(", ")}`)
  headers.push(`Subject: ${encodeHeaderText(input.subject)}`)
  if (input.inReplyTo !== undefined) headers.push(`In-Reply-To: ${input.inReplyTo}`)
  if (input.references !== undefined) headers.push(`References: ${input.references}`)
  headers.push("MIME-Version: 1.0")
  if (multipart === undefined || multipart.attachments.length === 0) {
    headers.push(TEXT_PART_HEADERS)
    return `${headers.join("\r\n")}\r\n\r\n${input.bodyText}`
  }
  const { boundary } = multipart
  headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`)
  const parts = [
    `${TEXT_PART_HEADERS}\r\n\r\n${input.bodyText}`,
    ...multipart.attachments.map(attachmentPart),
  ]
  const body = parts.map((part) => `--${boundary}\r\n${part}\r\n`).join("")
  return `${headers.join("\r\n")}\r\n\r\n${body}--${boundary}--\r\n`
}

export function toBase64Url(s: string): string {
  return Buffer.from(s, "utf-8").toString("base64url")
}

export function fromBase64Url(s: string): string {
  return Buffer.from(s, "base64url").toString("utf-8")
}
