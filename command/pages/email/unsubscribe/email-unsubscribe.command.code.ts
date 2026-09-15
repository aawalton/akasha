import { emailGoogle } from "akasha/alan/google/email/modules/email-operations/email-operations.module.code.ts"
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
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    const raw = await google.getRawMessage(client, read.taken.message)
    const intent = google.parseListUnsubscribe(
      google.getHeader(raw, HEADER),
      google.getHeader(raw, POST_HEADER)
    )
    return asIndentedJson(await google.executeUnsubscribe(client, intent, done))
  })
}
