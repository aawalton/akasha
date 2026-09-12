import { listMessages } from "akasha/alan/google/email/email-message-fetching/email-message-fetching.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { label } from "akasha/commands/arguments/pages/label.argument.ts"
import { mailQuery } from "akasha/commands/arguments/pages/mail-query.argument.ts"
import { max } from "akasha/commands/arguments/pages/max.argument.ts"
import { queryFile } from "akasha/commands/arguments/pages/query-file.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { emailMessageList as page } from "akasha/commands/pages/email/message/list/email-message-list.command.ts"

const SEARCH = filing(mailQuery.said)

export function emailMessageList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [queryFile, mailQuery, max, label])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  const taken = read.taken
  const query = filledIn(given.root, taken.mailQuery, taken.queryFile, SEARCH)
  if ("refused" in query) return Promise.resolve(refusedBy(query.refused, INPUT))
  return answering(async () =>
    asIndentedJson(
      await listMessages({
        query: query.text,
        max: taken.max,
        labelIds: taken.label.length > 0 ? taken.label : undefined,
      })
    )
  )
}
