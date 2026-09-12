import { extractActingAccountUserId } from "akasha/alan/harness/sms-core/acting-account/acting-account.module.code.ts"
import { heldAt } from "akasha/alan/harness/sms-core/sms-command-reading/sms-command-reading.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { surfaceFile } from "akasha/commands/arguments/pages/surface-file.argument.ts"
import { refusedBy, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { smsActingAccount as page } from "akasha/commands/pages/sms/acting-account/sms-acting-account.command.ts"

export function smsActingAccount(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [surfaceFile])
  if ("refused" in read) return refusedBy(read.refused)
  const held = heldAt(given, surfaceFile.said, read.taken.surfaceFile)
  if ("refused" in held) return refusedBy(held.refused)
  const accountUserId = extractActingAccountUserId(held.text)
  if (accountUserId === null) {
    return refusedBy([
      "this surface carries no trusted acting-account footer, so nothing may be written as anyone",
    ])
  }
  return told([accountUserId])
}
