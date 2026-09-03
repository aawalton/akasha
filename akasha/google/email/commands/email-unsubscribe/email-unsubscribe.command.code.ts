import type { Answer } from "@akasha/command-system/calling"
import { emailGoogle } from "@akasha/google-email/email-operations"
import {
  answeredBy,
  answering,
  MESSAGE,
  type Read,
  readTaking,
  refusing,
} from "../email-command-reading/email-command-reading.module.code.ts"

const HEADER = "List-Unsubscribe"

const POST_HEADER = "List-Unsubscribe-Post"

const TAKING = { valued: [MESSAGE], needed: [MESSAGE], named: MESSAGE } as const

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, TAKING)
}

export function emailUnsubscribe(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    const raw = await google.getRawMessage(client, said.one[MESSAGE] ?? "")
    const intent = google.parseListUnsubscribe(
      google.getHeader(raw, HEADER),
      google.getHeader(raw, POST_HEADER)
    )
    return answering(await google.executeUnsubscribe(client, intent))
  })
}
