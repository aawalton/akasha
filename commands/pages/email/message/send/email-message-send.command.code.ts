import {
  asJsonLines,
  composedIn,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { emailGoogle } from "akasha/alan/google/email/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { attach } from "akasha/commands/arguments/pages/attach.argument.ts"
import { bcc } from "akasha/commands/arguments/pages/bcc.argument.ts"
import { body } from "akasha/commands/arguments/pages/body.argument.ts"
import { bodyFile } from "akasha/commands/arguments/pages/body-file.argument.ts"
import { cc } from "akasha/commands/arguments/pages/cc.argument.ts"
import { replyToMessage } from "akasha/commands/arguments/pages/reply-to-message.argument.ts"
import { sendAs } from "akasha/commands/arguments/pages/send-as.argument.ts"
import { subject } from "akasha/commands/arguments/pages/subject.argument.ts"
import { subjectFile } from "akasha/commands/arguments/pages/subject-file.argument.ts"
import { thread } from "akasha/commands/arguments/pages/thread.argument.ts"
import { toAddress } from "akasha/commands/arguments/pages/to-address.argument.ts"
import {
  answering,
  INPUT,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { emailMessageSend as page } from "akasha/commands/pages/email/message/send/email-message-send.command.ts"

const TAKES = [
  toAddress,
  subjectFile,
  bodyFile,
  subject,
  body,
  thread,
  replyToMessage,
  sendAs,
  cc,
  bcc,
  attach,
]

export function emailMessageSend(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async (done) => {
    const composed = await composedIn(given, read.taken)
    if ("why" in composed) return refusedBy(composed.why, INPUT)
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asJsonLines(await google.sendMessage(client, composed.input, done))
  })
}
