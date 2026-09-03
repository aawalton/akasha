import type { Answer, Given } from "@akasha/command-system/calling"
import { buildSearchSql } from "../../chat-db/chat-db.module.code.ts"
import {
  fetchContacts,
  fetchMessages,
  resolveContactHandleRowids,
} from "../../remote/imessage-remote.module.code.ts"
import {
  answering,
  CONTACT_SAID,
  countOf,
  filing,
  JSON_SAID,
  LIMIT_ALSO,
  LIMIT_SAID,
  messagesAnswered,
  namingIn,
  proseIn,
  type Reading,
  refusedBy,
  wordFilling,
  wordsIn,
} from "../imessage-command-reading/imessage-command-reading.module.code.ts"

const QUERY = filing("--query")

const VALUED = [QUERY.said, QUERY.file, CONTACT_SAID, LIMIT_SAID]

const SWITCHES = [JSON_SAID]

const DEFAULT_LIMIT = 20

const OVER_ASKED_BY = 5

const WANTS = "what to search for"

export type Read = {
  readonly query: string
  readonly contact: string | undefined
  readonly limit: number
  readonly json: boolean
}

export function readIn(argv: readonly string[], given: Given): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES, LIMIT_ALSO)
  if ("refused" in said) return said
  const refusals: string[] = []
  const word = wordFilling(said, QUERY.said, WANTS)
  if (typeof word === "object") refusals.push(...word.refused)
  const filed = proseIn(given, said, QUERY)
  if ("refused" in filed) refusals.push(...filed.refused)
  if (said.loose.length > 0 && said.named[QUERY.file] !== undefined) {
    refusals.push(
      `${WANTS} is said as a word and at \`${QUERY.file}\`, and one way at a time is the way`
    )
  }
  const limit = countOf(said.named[LIMIT_SAID], LIMIT_SAID)
  if (typeof limit === "object") refusals.push(...limit.refused)
  const query = typeof word === "string" ? word : "refused" in filed ? undefined : filed.text
  if (query === undefined) refusals.push(`this names ${WANTS}, and nothing did`)
  if (refusals.length > 0 || query === undefined) return { refused: refusals }
  return {
    query,
    contact: said.named[CONTACT_SAID],
    limit: typeof limit === "number" ? limit : DEFAULT_LIMIT,
    json: said.flags.has(JSON_SAID),
  }
}

export function imessageSearch(argv: readonly string[], given: Given): Promise<Answer> {
  const said = readIn(argv, given)
  if ("refused" in said) return Promise.resolve(refusedBy(said.refused))
  return answering(async () => {
    const handleRowids =
      said.contact === undefined ? undefined : await resolveContactHandleRowids(said.contact)
    const [candidates, contacts] = await Promise.all([
      fetchMessages(
        buildSearchSql({
          query: said.query,
          limit: said.limit * OVER_ASKED_BY,
          ...(handleRowids === undefined ? {} : { handleRowids }),
        })
      ),
      fetchContacts(),
    ])
    const needle = said.query.toLowerCase()
    const matched = candidates
      .filter((one) => one.text.toLowerCase().includes(needle))
      .slice(0, said.limit)
    return messagesAnswered(matched, namingIn(contacts), said.json)
  })
}
