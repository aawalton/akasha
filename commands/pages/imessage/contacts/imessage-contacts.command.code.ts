import {
  JSON_SAID,
  type Reading,
  wordsIn,
} from "../../../../alan/harness/imessage/command-reading/imessage-command-reading.module.code.ts"
import { searchContacts } from "../../../../alan/harness/imessage/contacts-db/contacts-db.module.code.ts"
import { fetchContacts } from "../../../../alan/harness/imessage/remote/imessage-remote.module.code.ts"
import {
  answering,
  asJson,
  refusedBy,
  told,
} from "../../../modules/answering/command-answering.module.code.ts"
import type { Answer } from "../../../modules/calling/calling.module.code.ts"
import { wordFilling } from "../../../modules/command-filling/command-filling.module.code.ts"

const QUERY = "--query"

const VALUED = [QUERY]

const SWITCHES = [JSON_SAID]

const WANTS = "the name searched for"

export type Read = {
  readonly query: string
  readonly json: boolean
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const query = wordFilling(said, QUERY, WANTS)
  if (typeof query === "object") return query
  if (query === undefined) return { refused: [`this names ${WANTS}, and nothing did`] }
  return { query, json: said.flags.has(JSON_SAID) }
}

export function imessageContacts(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusedBy(said.refused))
  return answering(async () => {
    const matched = searchContacts(await fetchContacts(), said.query)
    if (said.json) return asJson(matched)
    return told(
      matched.map((one) => `${one.name}\t${one.phones.join(",")}\t${one.emails.join(",")}`)
    )
  })
}
