import { DataError } from "@akasha/errors-core/exit-code"
import { runSshCapture } from "@akasha/ssh-access/ssh-reach"
import {
  buildChatDbScript,
  buildCountUnreadSql,
  buildHandlesSql,
  type ImessageHandle,
  type ImessageMessage,
  parseHandleRows,
  parseMessageRows,
  parseUnreadCount,
} from "../chat-db/chat-db.module.code.ts"
import {
  buildContactsScript,
  type Contact,
  contactHandleKeys,
  handleKey,
  isEmailLike,
  isPhoneLike,
  parseContactsOutput,
  searchContacts,
} from "../contacts-db/contacts-db.module.code.ts"
import { MACBOOK } from "../host/imessage-host.module.code.ts"

export async function fetchMessages(sql: string): Promise<readonly ImessageMessage[]> {
  return parseMessageRows(await runSshCapture(MACBOOK, buildChatDbScript(sql)))
}

export async function fetchUnreadCount(): Promise<number> {
  return parseUnreadCount(await runSshCapture(MACBOOK, buildChatDbScript(buildCountUnreadSql())))
}

export async function fetchHandles(): Promise<readonly ImessageHandle[]> {
  return parseHandleRows(await runSshCapture(MACBOOK, buildChatDbScript(buildHandlesSql())))
}

export async function fetchContacts(): Promise<readonly Contact[]> {
  return parseContactsOutput(await runSshCapture(MACBOOK, buildContactsScript()))
}

export async function resolveContactHandleRowids(contact: string): Promise<readonly number[]> {
  const handles = await fetchHandles()
  if (isEmailLike(contact) || isPhoneLike(contact)) {
    const key = handleKey(contact)
    const rowids = handles.filter((h) => handleKey(h.id) === key).map((h) => h.rowid)
    if (rowids.length === 0) {
      throw new DataError(`no iMessage handle matches ${contact.trim()}`)
    }
    return rowids
  }
  const matches = searchContacts(await fetchContacts(), contact)
  if (matches.length === 0) {
    throw new DataError(
      `no contact matches "${contact}" — search the contact list for the name you meant, or ` +
        "pass an email address or phone number instead"
    )
  }
  const keys = new Set(matches.flatMap((c) => [...contactHandleKeys(c)]))
  const rowids = handles.filter((h) => keys.has(handleKey(h.id))).map((h) => h.rowid)
  if (rowids.length === 0) {
    const names = matches.map((c) => c.name).join(", ")
    throw new DataError(
      `contact "${contact}" matched (${names}) but none of their endpoints has an iMessage handle`
    )
  }
  return rowids
}
