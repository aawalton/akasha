import type { ImessageMessage } from "akasha/alan/harness/imessage/chat-db/chat-db.module.code.ts"
import { buildUnreadListSql } from "akasha/alan/harness/imessage/chat-db/chat-db.module.code.ts"
import {
  countRefused,
  namingIn,
  oldestFirst,
} from "akasha/alan/harness/imessage/command-reading/imessage-command-reading.module.code.ts"
import {
  formatLocalMinute,
  messageLabel,
  type NameFor,
  singleLine,
} from "akasha/alan/harness/imessage/message-lines/message-lines.module.code.ts"
import {
  fetchContacts,
  fetchMessages,
  resolveContactHandleRowids,
} from "akasha/alan/harness/imessage/remote/imessage-remote.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { contact } from "akasha/commands/arguments/pages/contact.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { limit as limitArgument } from "akasha/commands/arguments/pages/limit.argument.ts"
import {
  answering,
  asJson,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { imessageUnreadList as page } from "akasha/commands/pages/imessage/unread-list/imessage-unread-list.command.ts"

export function unreadLines(
  messages: readonly ImessageMessage[],
  name: NameFor
): readonly string[] {
  return oldestFirst(messages).map((one) =>
    [formatLocalMinute(one.unixSeconds), messageLabel(one, name), singleLine(one.text)].join("\t")
  )
}

export function unreadRecords(
  messages: readonly ImessageMessage[],
  name: NameFor
): readonly unknown[] {
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
