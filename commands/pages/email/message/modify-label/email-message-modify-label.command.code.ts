import {
  answeredBy,
  asJsonLines,
  refusing,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { emailGoogle } from "akasha/alan/google/email/email-operations/email-operations.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { addLabel } from "akasha/commands/arguments/pages/add-label.argument.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import { removeLabel } from "akasha/commands/arguments/pages/remove-label.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { emailMessageModifyLabel as page } from "akasha/commands/pages/email/message/modify-label/email-message-modify-label.command.ts"

export function emailMessageModifyLabel(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message, addLabel, removeLabel])
  if ("refused" in read) return Promise.resolve(refusing(read.refused, INPUT))
  const taken = read.taken
  if (taken.addLabel.length === 0 && taken.removeLabel.length === 0) {
    return Promise.resolve(
      refusing(
        [
          `\`${given.calledAs}\` names \`${addLabel.said}\` or \`${removeLabel.said}\` or both, and nothing said either`,
        ],
        INPUT
      )
    )
  }
  return answeredBy(async (done) => {
    const google = await emailGoogle()
    const client = await google.makeGmailClient()
    return asJsonLines(
      await google.modifyMessageLabels(
        client,
        taken.message,
        { addLabelIds: taken.addLabel, removeLabelIds: taken.removeLabel },
        done
      )
    )
  })
}
