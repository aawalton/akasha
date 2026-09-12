import { buildRecentSql } from "akasha/alan/harness/imessage/chat-db/chat-db.module.code.ts"
import {
  countRefused,
  messagesAnswered,
  namingIn,
} from "akasha/alan/harness/imessage/command-reading/imessage-command-reading.module.code.ts"
import {
  fetchContacts,
  fetchMessages,
  resolveContactHandleRowids,
} from "akasha/alan/harness/imessage/remote/imessage-remote.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { contact } from "akasha/commands/arguments/pages/contact.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { limit as limitArgument } from "akasha/commands/arguments/pages/limit.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { imessageRecentList as page } from "akasha/commands/pages/imessage/recent-list/imessage-recent-list.command.ts"

const DEFAULT_LIMIT = 20

export function imessageRecentList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, limitArgument, contact])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused))
  const taken = read.taken
  const why = countRefused(taken.limit, limitArgument.said)
  if (why.length > 0) return Promise.resolve(refusedBy(why))
  return answering(async () => {
    const handleRowids =
      taken.contact === undefined ? undefined : await resolveContactHandleRowids(taken.contact)
    const [messages, contacts] = await Promise.all([
      fetchMessages(
        buildRecentSql({
          limit: taken.limit ?? DEFAULT_LIMIT,
          ...(handleRowids === undefined ? {} : { handleRowids }),
        })
      ),
      fetchContacts(),
    ])
    return messagesAnswered(messages, namingIn(contacts), taken.json)
  })
}
