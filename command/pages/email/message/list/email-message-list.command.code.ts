import { listMessages } from "akasha/alan/google/email/modules/email-message-fetching/email-message-fetching.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { label } from "akasha/command/argument/pages/label.argument.ts"
import { mailQuery } from "akasha/command/argument/pages/mail-query.argument.ts"
import { max } from "akasha/command/argument/pages/max.argument.ts"
import { queryFile } from "akasha/command/argument/pages/query-file.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { emailMessageList as page } from "akasha/command/pages/email/message/list/email-message-list.command.ts"

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
