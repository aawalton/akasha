import type { ImessageMessage } from "akasha/alan/harness/imessage/modules/chat-db/chat-db.module.code.ts"
import type { Contact } from "akasha/alan/harness/imessage/modules/contacts-db/contacts-db.module.code.ts"
import { padTwo } from "akasha/text/writing/modules/pad-two/pad-two.module.code.ts"

interface ContactNaming {
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
  return `${d.getFullYear()}-${padTwo(d.getMonth() + 1)}-${padTwo(d.getDate())}T${padTwo(d.getHours())}:${padTwo(d.getMinutes())}`
}

export function messageLabel(msg: ImessageMessage, name: NameFor): string {
  const id = msg.handleId ?? msg.chatIdentifier
  const base = id === null || id === "" ? "unknown" : (name(id) ?? id)
  return msg.chatDisplayName === null ? base : `${msg.chatDisplayName}: ${base}`
}

export function singleLine(text: string): string {
  return text.replaceAll("\t", " ").replaceAll(/\s*\n\s*/g, " ⏎ ")
}
