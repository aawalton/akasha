import {
  formatLocalMinute,
  messageLabel,
  type NameFor,
  nameFor,
  singleLine,
} from "akasha/alan/harness/imessage/message-lines/message-lines.module.code.ts"
import type { ImessageMessage } from "akasha/alan/harness/imessage/modules/chat-db/chat-db.module.code.ts"
import type { Contact } from "akasha/alan/harness/imessage/modules/contacts-db/contacts-db.module.code.ts"
import {
  buildNameIndex,
  handleKey,
} from "akasha/alan/harness/imessage/modules/contacts-db/contacts-db.module.code.ts"
import { asJson, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const JSON_SAID = "--json"

export const CONTACT_SAID = "--contact"

export const LIMIT_SAID = "--limit"

const SENT = "→"

const CAME = "←"

export type Said = {
  readonly named: Readonly<Record<string, string>>
  readonly loose: readonly string[]
  readonly flags: ReadonlySet<string>
}

export type Reading<T> = T | { readonly refused: readonly string[] }

export function wordsIn(
  argv: readonly string[],
  valued: readonly string[],
  switches: readonly string[],
  also: Readonly<Record<string, string>> = {}
): Reading<Said> {
  const refusals: string[] = []
  const named: Record<string, string> = {}
  const loose: string[] = []
  const flags = new Set<string>()
  const known = (word: string): string => also[word] ?? word
  const takes = (word: string): boolean =>
    valued.includes(known(word)) || switches.includes(known(word))
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at]
    if (word === undefined) continue
    const said = known(word)
    if (switches.includes(said)) {
      flags.add(said)
      continue
    }
    if (valued.includes(said)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || takes(value)) {
        refusals.push(`\`${word}\` names a value, and nothing that could be one followed it`)
        continue
      }
      if (named[said] !== undefined) {
        refusals.push(`\`${said}\` is said once, and it was said twice`)
        continue
      }
      named[said] = value
      continue
    }
    if (word.startsWith("--")) {
      const every = namesDrawn([...valued, ...switches])
      refusals.push(`\`${word}\` is no flag this takes — it takes ${every}`)
      continue
    }
    loose.push(word)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { named, loose, flags }
}

export function countOf(said: string | undefined, flag: string): Reading<number | undefined> {
  if (said === undefined) return undefined
  if (!/^\d+$/.test(said) || Number(said) === 0) {
    return { refused: [`\`${flag}\` takes a whole number above zero, and \`${said}\` is not one`] }
  }
  const held = Number(said)
  if (!Number.isSafeInteger(held)) {
    return { refused: [`\`${flag}\` was said a number past the largest one that can be read`] }
  }
  return held
}

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
