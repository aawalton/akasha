import { asJsonLines } from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { getMessage } from "akasha/alan/google/email/email-message-fetching/email-message-fetching.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import {
  answering,
  INPUT,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { emailMessageShow as page } from "akasha/commands/pages/email/message/show/email-message-show.command.ts"

export function emailMessageShow(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async () => asJsonLines(await getMessage({ id: read.taken.message })))
}
