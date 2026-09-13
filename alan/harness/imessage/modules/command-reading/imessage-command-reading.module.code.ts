import type { ImessageMessage } from "akasha/alan/harness/imessage/modules/chat-db/chat-db.module.code.ts"
import type { Contact } from "akasha/alan/harness/imessage/modules/contacts-db/contacts-db.module.code.ts"
import {
  buildNameIndex,
  handleKey,
} from "akasha/alan/harness/imessage/modules/contacts-db/contacts-db.module.code.ts"
import {
  formatLocalMinute,
  messageLabel,
  type NameFor,
  nameFor,
  singleLine,
} from "akasha/alan/harness/imessage/modules/message-lines/message-lines.module.code.ts"
import { asJson, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"

const SENT = "→"

const CAME = "←"

export function countRefused(value: number | undefined, flag: string): readonly string[] {
  if (value === undefined) return []
  if (value === 0) return [`\`${flag}\` takes a whole number above zero, and \`0\` is not one`]
  if (!Number.isSafeInteger(value)) {
    return [`\`${flag}\` was said a number past the largest one that can be read`]
  }
  return []
}

export function namingIn(contacts: readonly Contact[]): NameFor {
  return nameFor({ buildNameIndex, handleKey }, contacts)
}

export function oldestFirst(messages: readonly ImessageMessage[]): readonly ImessageMessage[] {
  return [...messages].reverse()
}

export function messageLines(
  messages: readonly ImessageMessage[],
  name: NameFor
): readonly string[] {
  return oldestFirst(messages).map((one) =>
    [
      formatLocalMinute(one.unixSeconds),
      one.isFromMe ? SENT : CAME,
      messageLabel(one, name),
      singleLine(one.text),
    ].join("\t")
  )
}

function messageRecords(messages: readonly ImessageMessage[], name: NameFor): readonly unknown[] {
  return oldestFirst(messages).map((one) => ({
    rowid: one.rowid,
    guid: one.guid,
    date: formatLocalMinute(one.unixSeconds),
    unixSeconds: one.unixSeconds,
    isFromMe: one.isFromMe,
    handleId: one.handleId,
    contact: one.handleId === null ? null : name(one.handleId),
    chatIdentifier: one.chatIdentifier,
    chatDisplayName: one.chatDisplayName,
    text: one.text,
  }))
}

export function messagesAnswered(
  messages: readonly ImessageMessage[],
  name: NameFor,
  json: boolean
): Answer {
  return json ? asJson(messageRecords(messages, name)) : told(messageLines(messages, name))
}
