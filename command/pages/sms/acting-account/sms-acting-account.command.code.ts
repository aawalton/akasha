import { extractActingAccountUserId } from "akasha/alan/harness/sms-core/modules/acting-account/acting-account.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { surfaceFile } from "akasha/command/arguments/pages/surface-file.argument.ts"
import { refusedBy, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { heldAt } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { smsActingAccount as page } from "akasha/command/pages/sms/acting-account/sms-acting-account.command.ts"

export function smsActingAccount(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [surfaceFile])
  if ("refused" in read) return refusedBy(read.refused)
  const held = heldAt(given.root, surfaceFile.said, read.taken.surfaceFile)
  if ("refused" in held) return refusedBy(held.refused)
  const accountUserId = extractActingAccountUserId(held.text)
  if (accountUserId === null) {
    return refusedBy([
      "this surface carries no trusted acting-account footer, so nothing may be written as anyone",
    ])
  }
  return told([accountUserId])
}
