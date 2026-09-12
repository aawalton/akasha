import {
  asJsonLines,
  refusing,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { emailGoogle } from "akasha/alan/google/email/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import {
  answering,
  INPUT,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { emailMessageArchive as page } from "akasha/commands/pages/email/message/archive/email-message-archive.command.ts"

export function emailMessageArchive(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusing(read.refused, INPUT))
  return answering(async (done) => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asJsonLines(await google.archiveMessage(client, read.taken.message, done))
  })
}
