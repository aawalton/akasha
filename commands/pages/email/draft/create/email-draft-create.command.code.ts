import {
  answeredBy,
  asJsonLines,
  COMPOSING,
  composedIn,
  type Read,
  readTaking,
  refusing,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { emailGoogle } from "akasha/alan/google/email/email-operations/email-operations.module.code.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, COMPOSING)
}

export function emailDraftCreate(argv: readonly string[], given: Given): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, INPUT))
  return answeredBy(async (done) => {
    const composed = await composedIn(given, said)
    if ("why" in composed) return refusing([composed.why], INPUT)
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asJsonLines(await google.createDraft(client, composed.input, done))
  })
}
