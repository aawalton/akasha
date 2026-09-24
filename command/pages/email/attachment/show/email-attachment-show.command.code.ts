import { getAttachment } from "akasha/alan/google/email/modules/gmail-attachments/gmail-attachments.module.code.ts"
import { makeGmailClient } from "akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { attachmentId } from "akasha/command/argument/pages/attachment-id.argument.ts"
import { message } from "akasha/command/argument/pages/message.argument.ts"
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
    const client = await makeGmailClient()
    return asIndentedJson(await getAttachment(client, read.taken.message, read.taken.attachmentId))
  })
}
