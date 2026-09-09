import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { whyOf } from "@akasha/command-system/fault-saying"
import type { Answer, Given } from "../../../../commands/modules/calling/calling.module.code.ts"
import {
  asJson,
  told,
} from "../../../../commands/modules/command-answering/command-answering.module.code.ts"
import type { Filing } from "../../../../commands/modules/command-filling/command-filling.module.code.ts"
import { inputIn, type Piping } from "../../../../commands/modules/piping/piping.module.code.ts"
import type { ImessageMessage } from "../chat-db/chat-db.module.code.ts"
import type { Contact } from "../contacts-db/contacts-db.module.code.ts"
import { buildNameIndex, handleKey } from "../contacts-db/contacts-db.module.code.ts"
import {
  formatLocalMinute,
  messageLabel,
  type NameFor,
  nameFor,
  singleLine,
} from "../message-lines/message-lines.module.code.ts"

export const JSON_SAID = "--json"

export const CONTACT_SAID = "--contact"

export const LIMIT_SAID = "--limit"

export const TAIL_SAID = "--tail"

export const PIPED_SAID = "-"

export const LIMIT_ALSO: Readonly<Record<string, string>> = { [TAIL_SAID]: LIMIT_SAID }

const TRAILING_LINES = /(?:\r?\n)+$/

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
      const every = [...valued, ...switches].map((one) => `\`${one}\``).join(", ")
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

export type Prose = { readonly text: string | undefined } | { readonly refused: readonly string[] }

export function proseIn(given: Given, said: Said, one: Filing, piping: Piping = inputIn): Prose {
  const inline = said.named[one.said]
  const path = said.named[one.file]
  if (inline !== undefined && path !== undefined) {
    return {
      refused: [
        `\`${one.said}\` and \`${one.file}\` both say what to send, and one way at a time is the way`,
      ],
    }
  }
  if (inline !== undefined) return { text: inline }
  if (path === undefined) return { text: undefined }
  if (path === PIPED_SAID) {
    const held = piping()
    if ("tty" in held) {
      return { refused: [`\`${one.file} -\` names the input, and nothing is piped in`] }
    }
    if ("unreadable" in held) {
      return { refused: [`the input would not open — ${held.unreadable}`] }
    }
    return { text: new TextDecoder().decode(held.bytes).replace(TRAILING_LINES, "") }
  }
  try {
    return { text: readFileSync(resolve(given.root, path), "utf8").replace(TRAILING_LINES, "") }
  } catch (thrown) {
    return { refused: [`\`${one.file} ${path}\` would not open — ${whyOf(thrown)}`] }
  }
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

export function messageRecords(
  messages: readonly ImessageMessage[],
  name: NameFor
): readonly unknown[] {
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
