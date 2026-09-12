import {
  answeredBy,
  asJsonLines,
  refusing,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { emailGoogle } from "akasha/alan/google/email/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { attachmentId } from "akasha/commands/arguments/pages/attachment-id.argument.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { emailAttachmentShow as page } from "akasha/commands/pages/email/attachment/show/email-attachment-show.command.ts"

export function emailAttachmentShow(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message, attachmentId])
  if ("refused" in read) return Promise.resolve(refusing(read.refused, INPUT))
  return answeredBy(async () => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asJsonLines(
      await google.getAttachment(client, read.taken.message, read.taken.attachmentId)
    )
  })
}
