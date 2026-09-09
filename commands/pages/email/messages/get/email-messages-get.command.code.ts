import type { Answer } from "@akasha/command-system/calling"
import { getMessage } from "akasha/google/email/email-message-fetching/email-message-fetching.module.code.ts"
import {
  answeredBy,
  answering,
  MESSAGE,
  type Read,
  readTaking,
  refusing,
} from "../../../../../google/email/commands/email-command-reading/email-command-reading.module.code.ts"

const TAKING = { valued: [MESSAGE], needed: [MESSAGE], named: MESSAGE } as const

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, TAKING)
}

export function emailMessagesGet(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => answering(await getMessage({ id: said.one[MESSAGE] ?? "" })))
}
