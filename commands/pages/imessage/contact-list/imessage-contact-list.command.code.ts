import { searchContacts } from "akasha/alan/harness/imessage/modules/contacts-db/contacts-db.module.code.ts"
import { fetchContacts } from "akasha/alan/harness/imessage/modules/remote/imessage-remote.module.code.ts"
import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { contactQuery } from "akasha/command/arguments/pages/contact-query.argument.ts"
import { json } from "akasha/command/arguments/pages/json.argument.ts"
import {
  answering,
  asJson,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { imessageContactList as page } from "akasha/command/pages/imessage/contact-list/imessage-contact-list.command.ts"

export function imessageContactList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, contactQuery])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused))
  const taken = read.taken
  return answering(async () => {
    const matched = searchContacts(await fetchContacts(), taken.contactQuery)
    if (taken.json) return asJson(matched)
    return told(
      matched.map((one) => `${one.name}\t${one.phones.join(",")}\t${one.emails.join(",")}`)
    )
  })
}
