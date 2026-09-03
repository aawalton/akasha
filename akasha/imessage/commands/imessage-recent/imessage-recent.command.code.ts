import type { Answer } from "@akasha/command-system/calling"
import { buildRecentSql } from "../../chat-db/chat-db.module.code.ts"
import {
  fetchContacts,
  fetchMessages,
  resolveContactHandleRowids,
} from "../../remote/imessage-remote.module.code.ts"
import {
  answering,
  CONTACT_SAID,
  countOf,
  JSON_SAID,
  LIMIT_ALSO,
  LIMIT_SAID,
  messagesAnswered,
  namingIn,
  noneLoose,
  type Reading,
  refusedBy,
  wordsIn,
} from "../imessage-command-reading/imessage-command-reading.module.code.ts"

const VALUED = [LIMIT_SAID, CONTACT_SAID]

const SWITCHES = [JSON_SAID]

const DEFAULT_LIMIT = 20

export type Read = {
  readonly contact: string | undefined
  readonly limit: number
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES, LIMIT_ALSO)
  if ("refused" in said) return said
  const refusals = [...noneLoose(said)]
  const limit = countOf(said.named[LIMIT_SAID], LIMIT_SAID)
  if (typeof limit === "object") refusals.push(...limit.refused)
  if (refusals.length > 0) return { refused: refusals }
  return {
    contact: said.named[CONTACT_SAID],
    limit: typeof limit === "number" ? limit : DEFAULT_LIMIT,
    json: said.flags.has(JSON_SAID),
  }
}

export function imessageRecent(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusedBy(said.refused))
  return answering(async () => {
    const handleRowids =
      said.contact === undefined ? undefined : await resolveContactHandleRowids(said.contact)
    const [messages, contacts] = await Promise.all([
      fetchMessages(
        buildRecentSql({
          limit: said.limit,
          ...(handleRowids === undefined ? {} : { handleRowids }),
        })
      ),
      fetchContacts(),
    ])
    return messagesAnswered(messages, namingIn(contacts), said.json)
  })
}
