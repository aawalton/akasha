import type { Answer, Given } from "@akasha/command-system/calling"
import { emailGoogle } from "@akasha/google-email/email-operations"
import {
  answeredBy,
  answering,
  type Filing,
  MAX,
  maxIn,
  proseIn,
  type Read,
  readTaking,
  refusing,
} from "../email-command-reading/email-command-reading.module.code.ts"

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

export function emailMessagesList(argv: readonly string[], given: Given): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => {
    const query = proseIn(given, said, FILING)
    if ("why" in query) return refusing([query.why], 1)
    const labels = said.many[LABEL] ?? []
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return answering(
      await google.listMessages(client, {
        query: query.said,
        max: maxIn(said),
        labelIds: labels.length > 0 ? labels : undefined,
      })
    )
  })
}
