import { buildSearchSql } from "akasha/alan/harness/imessage/modules/chat-db/chat-db.module.code.ts"
import {
  countRefused,
  messagesAnswered,
  namingIn,
} from "akasha/alan/harness/imessage/modules/command-reading/imessage-command-reading.module.code.ts"
import {
  fetchContacts,
  fetchMessages,
  resolveContactHandleRowids,
} from "akasha/alan/harness/imessage/modules/remote/imessage-remote.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { contact } from "akasha/command/arguments/pages/contact.argument.ts"
import { json } from "akasha/command/arguments/pages/json.argument.ts"
import { limit as limitArgument } from "akasha/command/arguments/pages/limit.argument.ts"
import { messageQuery } from "akasha/command/arguments/pages/message-query.argument.ts"
import { queryFile } from "akasha/command/arguments/pages/query-file.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { imessageSearch as page } from "akasha/command/pages/imessage/search/imessage-search.command.ts"

const QUERY = filing(messageQuery.said)

const OVER_ASKED_BY = 5

const WANTS = "what to search for"

export function imessageSearch(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    json,
    queryFile,
    messageQuery,
    contact,
    limitArgument,
  ])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused))
  const taken = read.taken
  const held = filledIn(given.root, taken.messageQuery, taken.queryFile, QUERY)
  if ("refused" in held) return Promise.resolve(refusedBy(held.refused))
  const query = held.text
  const wrong = countRefused(taken.limit, limitArgument.said)
  if (wrong.length > 0) return Promise.resolve(refusedBy(wrong))
  if (query === undefined) {
    return Promise.resolve(refusedBy([`this names ${WANTS}, and nothing did`]))
  }
  const limit = taken.limit
  return answering(async () => {
    const handleRowids =
      taken.contact === undefined ? undefined : await resolveContactHandleRowids(taken.contact)
    const [candidates, contacts] = await Promise.all([
      fetchMessages(
        buildSearchSql({
          query,
          limit: limit * OVER_ASKED_BY,
          ...(handleRowids === undefined ? {} : { handleRowids }),
        })
      ),
      fetchContacts(),
    ])
    const needle = query.toLowerCase()
    const matched = candidates
      .filter((one) => one.text.toLowerCase().includes(needle))
      .slice(0, limit)
    return messagesAnswered(matched, namingIn(contacts), taken.json)
  })
}
