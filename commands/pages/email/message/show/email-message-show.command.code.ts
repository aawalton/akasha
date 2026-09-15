import { getMessage } from "akasha/alan/google/email/modules/email-message-fetching/email-message-fetching.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { message } from "akasha/command/arguments/pages/message.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailMessageShow as page } from "akasha/command/pages/email/message/show/email-message-show.command.ts"

export function emailMessageShow(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async () => asIndentedJson(await getMessage({ id: read.taken.message })))
}
