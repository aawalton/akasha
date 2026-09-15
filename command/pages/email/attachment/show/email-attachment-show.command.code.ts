import { emailGoogle } from "akasha/alan/google/email/modules/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { attachmentId } from "akasha/command/arguments/pages/attachment-id.argument.ts"
import { message } from "akasha/command/arguments/pages/message.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailAttachmentShow as page } from "akasha/command/pages/email/attachment/show/email-attachment-show.command.ts"

export function emailAttachmentShow(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message, attachmentId])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async () => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asIndentedJson(
      await google.getAttachment(client, read.taken.message, read.taken.attachmentId)
    )
  })
}
