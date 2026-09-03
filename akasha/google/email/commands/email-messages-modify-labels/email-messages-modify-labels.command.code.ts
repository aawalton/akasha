import type { Answer } from "@akasha/command-system/calling"
import { emailGoogle } from "@akasha/google-email/email-operations"
import {
  answeredBy,
  answering,
  MESSAGE,
  type Read,
  readTaking,
  refusing,
} from "../email-command-reading/email-command-reading.module.code.ts"

const ADD = "--add"

const REMOVE = "--remove"

const TAKING = {
  valued: [MESSAGE],
  repeats: [ADD, REMOVE],
  needed: [MESSAGE],
  named: MESSAGE,
  either: [ADD, REMOVE],
} as const

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, TAKING)
}

export function emailMessagesModifyLabels(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return answering(
      await google.modifyMessageLabels(client, said.one[MESSAGE] ?? "", {
        addLabelIds: said.many[ADD] ?? [],
        removeLabelIds: said.many[REMOVE] ?? [],
      })
    )
  })
}
