import { composedIn } from "akasha/alan/google/email/modules/email-command-reading/email-command-reading.module.code.ts"
import { emailGoogle } from "akasha/alan/google/email/modules/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { attach } from "akasha/command/arguments/pages/attach.argument.ts"
import { bcc } from "akasha/command/arguments/pages/bcc.argument.ts"
import { body } from "akasha/command/arguments/pages/body.argument.ts"
import { bodyFile } from "akasha/command/arguments/pages/body-file.argument.ts"
import { cc } from "akasha/command/arguments/pages/cc.argument.ts"
import { replyToMessage } from "akasha/command/arguments/pages/reply-to-message.argument.ts"
import { sendAs } from "akasha/command/arguments/pages/send-as.argument.ts"
import { subject } from "akasha/command/arguments/pages/subject.argument.ts"
import { subjectFile } from "akasha/command/arguments/pages/subject-file.argument.ts"
import { thread } from "akasha/command/arguments/pages/thread.argument.ts"
import { toAddress } from "akasha/command/arguments/pages/to-address.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailDraftCreate as page } from "akasha/command/pages/email/draft/create/email-draft-create.command.ts"

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

export function emailDraftCreate(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async (done) => {
    const composed = await composedIn(given, read.taken)
    if ("why" in composed) return refusedBy(composed.why, INPUT)
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asIndentedJson(await google.createDraft(client, composed.input, done))
  })
}
