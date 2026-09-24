import { listAttachments } from "akasha/alan/google/email/modules/gmail-attachments/gmail-attachments.module.code.ts"
import { makeGmailClient } from "akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"
import { getRawMessage } from "akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { message } from "akasha/command/argument/pages/message.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailAttachmentList as page } from "akasha/command/pages/email/attachment/list/email-attachment-list.command.ts"

export function emailAttachmentList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async () => {
    const client = await makeGmailClient()
    return asIndentedJson(listAttachments(await getRawMessage(client, read.taken.message)))
  })
}
