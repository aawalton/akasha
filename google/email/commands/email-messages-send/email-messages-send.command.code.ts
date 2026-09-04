import type { Answer, Given } from "@akasha/command-system/calling"
import { emailGoogle } from "@akasha/google-email/email-operations"
import {
  answeredBy,
  answering,
  COMPOSING,
  composedIn,
  type Read,
  readTaking,
  refusing,
} from "../email-command-reading/email-command-reading.module.code.ts"

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, COMPOSING)
}

export function emailMessagesSend(argv: readonly string[], given: Given): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => {
    const composed = await composedIn(given, said)
    if ("why" in composed) return refusing([composed.why], 1)
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return answering(await google.sendMessage(client, composed.input))
  })
}
