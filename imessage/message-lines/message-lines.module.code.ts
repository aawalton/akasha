import type { ImessageMessage } from "../chat-db/chat-db.module.code.ts"
import type { Contact } from "../contacts-db/contacts-db.module.code.ts"

export interface ContactNaming {
  readonly buildNameIndex: (contacts: readonly Contact[]) => ReadonlyMap<string, string>
  readonly handleKey: (id: string) => string
}

export type NameFor = (id: string) => string | null

export function nameFor(contactsDb: ContactNaming, contacts: readonly Contact[]): NameFor {
  const nameByKey = contactsDb.buildNameIndex(contacts)
  return (id) => nameByKey.get(contactsDb.handleKey(id)) ?? null
}

export function formatLocalMinute(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000)
  const p = (n: number): string => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

export function messageLabel(msg: ImessageMessage, name: NameFor): string {
  const id = msg.handleId ?? msg.chatIdentifier
  const base = id === null || id === "" ? "unknown" : (name(id) ?? id)
  return msg.chatDisplayName === null ? base : `${msg.chatDisplayName}: ${base}`
}

export function singleLine(text: string): string {
  return text.replaceAll("\t", " ").replaceAll(/\s*\n\s*/g, " ⏎ ")
}

export function emitMessages(
  messages: readonly ImessageMessage[],
  name: NameFor,
  json: boolean
): undefined {
  const oldestFirst = [...messages].reverse()
  if (json) {
    const records = oldestFirst.map((m) => ({
      rowid: m.rowid,
      guid: m.guid,
      date: formatLocalMinute(m.unixSeconds),
      unixSeconds: m.unixSeconds,
      isFromMe: m.isFromMe,
      handleId: m.handleId,
      contact: m.handleId === null ? null : name(m.handleId),
      chatIdentifier: m.chatIdentifier,
      chatDisplayName: m.chatDisplayName,
      text: m.text,
    }))
    process.stdout.write(`${JSON.stringify(records)}\n`)
    return
  }
  for (const m of oldestFirst) {
    const arrow = m.isFromMe ? "→" : "←"
    process.stdout.write(
      `${formatLocalMinute(m.unixSeconds)}\t${arrow}\t${messageLabel(m, name)}\t${singleLine(m.text)}\n`
    )
  }
}
