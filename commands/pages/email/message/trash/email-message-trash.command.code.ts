import { emailGoogle } from "akasha/alan/google/email/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { emailMessageTrash as page } from "akasha/commands/pages/email/message/trash/email-message-trash.command.ts"

export function emailMessageTrash(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async (done) => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asIndentedJson(await google.trashMessage(client, read.taken.message, done))
  })
}
