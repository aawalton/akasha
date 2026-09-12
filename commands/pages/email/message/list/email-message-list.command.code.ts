import {
  answeredBy,
  asJsonLines,
  MAX,
  maxIn,
  type Read,
  readTaking,
  refusing,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { listMessages } from "akasha/alan/google/email/email-message-fetching/email-message-fetching.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Filing,
  proseIn,
} from "akasha/commands/modules/filling/command-filling.module.code.ts"

const QUERY = "--query"

const QUERY_FILE = "--query-file"

const LABEL = "--label"

const FILING: Filing = { said: QUERY, file: QUERY_FILE, whole: false }

const TAKING = {
  valued: [QUERY, QUERY_FILE, MAX],
  repeats: [LABEL],
  numbered: [MAX],
  filing: [FILING],
} as const

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, TAKING)
}

export function emailMessageList(argv: readonly string[], given: Given): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => {
    const query = proseIn(given.root, said.one, FILING)
    if ("refused" in query) return refusing(query.refused, 1)
    const labels = said.many[LABEL] ?? []
    return asJsonLines(
      await listMessages({
        query: query.text,
        max: maxIn(said),
        labelIds: labels.length > 0 ? labels : undefined,
      })
    )
  })
}
