import { parseSender } from "@akasha/email-inbound/sender"
import type { ComposeInput } from "../email-shapes/email-shapes.module.code.ts"
import { loadAttachmentFile } from "../gmail-attachments/gmail-attachments.module.code.ts"

interface NamedSender {
  readonly name: string
  readonly email: string
}

export interface ComposeSaid {
  readonly to: readonly string[]
  readonly cc?: readonly string[]
  readonly bcc?: readonly string[]
  readonly subject: string
  readonly body: string
  readonly thread?: string | undefined
  readonly replyToMessage?: string | undefined
  readonly from?: string | undefined
  readonly attach?: readonly string[]
}

function splitAddresses(values: readonly string[]): readonly string[] {
  return values
    .flatMap((value) => value.split(","))
    .map((part) => part.trim())
    .filter((part) => part !== "")
}

function stripSurroundingQuotes(value: string): string {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"'))
    return value.slice(1, -1).trim()
  return value
}

function parseFromFlag(value: string | undefined): NamedSender | undefined {
  if (value === undefined) return undefined
  const trimmed = value.trim()
  if (trimmed === "") return undefined
  const angle = trimmed.indexOf("<")
  if (angle >= 0 && trimmed.endsWith(">")) {
    const name = stripSurroundingQuotes(trimmed.slice(0, angle).trim())
    const { address } = parseSender(trimmed.slice(angle))
    return { name, email: address }
  }
  const { address } = parseSender(trimmed)
  return { name: "", email: address }
}

export async function buildComposeInput(said: ComposeSaid): Promise<ComposeInput> {
  const cc = splitAddresses(said.cc ?? [])
  const bcc = splitAddresses(said.bcc ?? [])
  const attachments = await Promise.all((said.attach ?? []).map((path) => loadAttachmentFile(path)))
  return {
    to: splitAddresses(said.to),
    cc: cc.length > 0 ? cc : undefined,
    bcc: bcc.length > 0 ? bcc : undefined,
    subject: said.subject,
    body: said.body,
    threadId: said.thread,
    replyToMessageId: said.replyToMessage,
    from: parseFromFlag(said.from),
    attachments: attachments.length > 0 ? attachments : undefined,
  }
}
