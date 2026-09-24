import { makeGmailClient } from "akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"
import { trashMessage } from "akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { message } from "akasha/command/argument/pages/message.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailMessageTrash as page } from "akasha/command/pages/email/message/trash/email-message-trash.command.ts"

export function emailMessageTrash(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async (done) => {
    return asIndentedJson(await trashMessage(await makeGmailClient(), read.taken.message, done))
  })
}
