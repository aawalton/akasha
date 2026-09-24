import { makeGmailClient } from "akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"
import { getRawMessage } from "akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts"
import { getHeader } from "akasha/alan/google/email/modules/gmail-schema/gmail-schema.module.code.ts"
import {
  executeUnsubscribe,
  parseListUnsubscribe,
} from "akasha/alan/google/email/modules/list-unsubscribe/list-unsubscribe.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { message } from "akasha/command/argument/pages/message.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailUnsubscribe as page } from "akasha/command/pages/email/unsubscribe/email-unsubscribe.command.ts"

const HEADER = "List-Unsubscribe"

const POST_HEADER = "List-Unsubscribe-Post"

export function emailUnsubscribe(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async (done) => {
    const client = await makeGmailClient()
    const raw = await getRawMessage(client, read.taken.message)
    const intent = parseListUnsubscribe(getHeader(raw, HEADER), getHeader(raw, POST_HEADER))
    return asIndentedJson(await executeUnsubscribe(client, intent, done))
  })
}
