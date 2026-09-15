import { emailGoogle } from "akasha/alan/google/email/modules/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { max } from "akasha/command/arguments/pages/max.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailDraftList as page } from "akasha/command/pages/email/draft/list/email-draft-list.command.ts"

export function emailDraftList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [max])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  return answering(async () => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asIndentedJson(await google.listDrafts(client, read.taken.max))
  })
}
