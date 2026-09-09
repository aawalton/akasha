import { emailGoogle } from "akasha/google/email/email-operations/email-operations.module.code.ts"
import {
  answeredBy,
  answering,
  MESSAGE,
  type Read,
  readTaking,
  refusing,
} from "../../../../../google/email/email-command-reading/email-command-reading.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"

const TAKING = { valued: [MESSAGE], needed: [MESSAGE], named: MESSAGE } as const

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, TAKING)
}

export function emailAttachmentsList(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return answering(
      google.listAttachments(await google.getRawMessage(client, said.one[MESSAGE] ?? ""))
    )
  })
}
