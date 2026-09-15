import type { ImessageMessage } from "akasha/alan/harness/imessage/modules/chat-db/chat-db.module.code.ts"
import { buildUnreadListSql } from "akasha/alan/harness/imessage/modules/chat-db/chat-db.module.code.ts"
import {
  countRefused,
  namingIn,
  oldestFirst,
} from "akasha/alan/harness/imessage/modules/command-reading/imessage-command-reading.module.code.ts"
import {
  formatLocalMinute,
  messageLabel,
  type NameFor,
  singleLine,
} from "akasha/alan/harness/imessage/modules/message-lines/message-lines.module.code.ts"
import {
  fetchContacts,
  fetchMessages,
  resolveContactHandleRowids,
} from "akasha/alan/harness/imessage/modules/remote/imessage-remote.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { contact } from "akasha/command/argument/pages/contact.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { limit as limitArgument } from "akasha/command/argument/pages/limit.argument.ts"
import {
  answering,
  asJson,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { imessageUnreadList as page } from "akasha/command/pages/imessage/unread-list/imessage-unread-list.command.ts"

function unreadLines(messages: readonly ImessageMessage[], name: NameFor): readonly string[] {
  return oldestFirst(messages).map((one) =>
    [formatLocalMinute(one.unixSeconds), messageLabel(one, name), singleLine(one.text)].join("\t")
  )
}

function unreadRecords(messages: readonly ImessageMessage[], name: NameFor): readonly unknown[] {
  return oldestFirst(messages).map((one) => ({
    rowid: one.rowid,
    guid: one.guid,
    date: formatLocalMinute(one.unixSeconds),
    unixSeconds: one.unixSeconds,
    sender: messageLabel(one, name),
    handleId: one.handleId,
    contact: one.handleId === null ? null : name(one.handleId),
    chatIdentifier: one.chatIdentifier,
    chatDisplayName: one.chatDisplayName,
    text: one.text,
  }))
}

export function imessageUnreadList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, limitArgument, contact])
  if ("refused" in read) return Promise.resolve(refusedBy(read.refused))
  const taken = read.taken
  const why = countRefused(taken.limit, limitArgument.said)
  if (why.length > 0) return Promise.resolve(refusedBy(why))
  return answering(async () => {
    const handleRowids =
      taken.contact === undefined ? undefined : await resolveContactHandleRowids(taken.contact)
    const [messages, contacts] = await Promise.all([
      fetchMessages(
        buildUnreadListSql({
          ...(taken.limit === undefined ? {} : { limit: taken.limit }),
          ...(handleRowids === undefined ? {} : { handleRowids }),
        })
      ),
      fetchContacts(),
    ])
    const name = namingIn(contacts)
    return taken.json ? asJson(unreadRecords(messages, name)) : told(unreadLines(messages, name))
  })
}
