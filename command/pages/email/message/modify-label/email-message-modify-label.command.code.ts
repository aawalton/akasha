import { makeGmailClient } from "akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"
import { modifyMessageLabels } from "akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { addLabel } from "akasha/command/argument/pages/add-label.argument.ts"
import { message } from "akasha/command/argument/pages/message.argument.ts"
import { removeLabel } from "akasha/command/argument/pages/remove-label.argument.ts"
import {
  answering,
  asIndentedJson,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailMessageModifyLabel as page } from "akasha/command/pages/email/message/modify-label/email-message-modify-label.command.ts"

export function emailMessageModifyLabel(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [message, addLabel, removeLabel])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused, INPUT))
  const taken = read.taken
  return answering(async (done) => {
    const client = await makeGmailClient()
    return asIndentedJson(
      await modifyMessageLabels(
        client,
        taken.message,
        { addLabelIds: taken.addLabel, removeLabelIds: taken.removeLabel },
        done
      )
    )
  })
}
