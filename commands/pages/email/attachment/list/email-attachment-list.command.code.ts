import {
  answeredBy,
  answering,
  refusing,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { emailGoogle } from "akasha/alan/google/email/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { emailAttachmentList as page } from "akasha/commands/pages/email/attachment/list/email-attachment-list.command.ts"

export function emailAttachmentList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusing(read.refused, 1))
  return answeredBy(async () => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return answering(google.listAttachments(await google.getRawMessage(client, read.taken.message)))
  })
}
