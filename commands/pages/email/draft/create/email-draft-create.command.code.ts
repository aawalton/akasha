import {
  answeredBy,
  answering,
  COMPOSING,
  composedIn,
  type Read,
  readTaking,
  refusing,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { emailGoogle } from "akasha/alan/google/email/email-operations/email-operations.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, COMPOSING)
}

export function emailDraftCreate(argv: readonly string[], given: Given): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async (done) => {
    const composed = await composedIn(given, said)
    if ("why" in composed) return refusing([composed.why], 1)
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return answering(await google.createDraft(client, composed.input, done))
  })
}
