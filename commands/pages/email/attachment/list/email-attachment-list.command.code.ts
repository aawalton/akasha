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
import { emailAttachmentList as page } from "akasha/commands/pages/email/attachment/list/email-attachment-list.command.ts"

export function emailAttachmentList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async () => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asIndentedJson(
      google.listAttachments(await google.getRawMessage(client, read.taken.message))
    )
  })
}
