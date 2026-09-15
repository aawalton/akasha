import { emailGoogle } from "akasha/alan/google/email/modules/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { message } from "akasha/command/arguments/pages/message.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailMessageArchive as page } from "akasha/command/pages/email/message/archive/email-message-archive.command.ts"

export function emailMessageArchive(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async (done) => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asIndentedJson(await google.archiveMessage(client, read.taken.message, done))
  })
}
