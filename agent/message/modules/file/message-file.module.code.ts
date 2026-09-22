import { existsSync } from "node:fs"
import { messageNamed } from "akasha/agent/message/modules/naming/message-naming.module.code.ts"
import {
  MESSAGE,
  messagesDirRelPath,
  overHttp,
  recipientRefused,
  type Sending,
  type Warrant,
  WRITER,
} from "akasha/agent/message/modules/sending/message-sending.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  mergeUncommitted,
  removeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { slugAt, textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pagesAtFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const PAGE_EXT = `.${MESSAGE}.ts`

const CLAIMED_AT_KEY = "claimedAt"

export interface Message {
  readonly id: string
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly body: string
  readonly claimedAtMs: number | null
  readonly relPath: string
}

export type Taken =
  | { readonly kind: "taken" }
  | { readonly kind: "gone" }
  | { readonly kind: "refused"; readonly detail: string }

function messageRelPath(to: string, id: string): string {
  const stem = id.startsWith(`${MESSAGE}-`) ? id : messageNamed(id)
  const found = messagesTo(to).find((one) => one.id === stem)
  return found?.relPath ?? `${messagesDirRelPath()}/${stem}${PAGE_EXT}`
}

function msOf(said: unknown): number | null {
  if (typeof said !== "string") return null
  const ms = Date.parse(said)
  return Number.isFinite(ms) ? ms : null
}

function pageMessages(): readonly Message[] {
  const root = akashaRoot()
  const under = `${pagesAtFor(root, MESSAGE)}/`
  const held: Message[] = []
  for (const one of valuesOfType(root, MESSAGE)) {
    if (!one.path.startsWith(under)) continue
    const slug = textAt(one.value, "slug")
    if (slug === null) continue
    held.push({
      id: slug,
      to: slugAt(one.value, "to") ?? "",
      from: textAt(one.value, "from") ?? "",
      warrant: one.value["warrant"] === "blocked" ? "blocked" : "announce",
      body: textAt(one.value, "body") ?? "",
      claimedAtMs: msOf(uncommittedIn(root, one.path)?.[CLAIMED_AT_KEY]),
      relPath: one.path,
    })
  }
  return held
}

export function messagesTo(to: string): readonly Message[] {
  if (recipientRefused(to) !== null) return []
  const held = pageMessages().filter((one) => one.to === to)
  return [...held].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
}

export function unclaimedTo(to: string): readonly Message[] {
  return messagesTo(to).filter((one) => one.claimedAtMs === null)
}

export function everyRecipient(): readonly string[] {
  const held = new Set<string>()
  for (const one of pageMessages()) if (one.to !== "") held.add(one.to)
  return [...held].sort()
}

export function claimedBefore(to: string, beforeMs: number): readonly Message[] {
  return messagesTo(to).filter((one) => one.claimedAtMs !== null && one.claimedAtMs < beforeMs)
}

export function claimMessage(to: string, id: string, atMs: number = Date.now()): boolean {
  const root = akashaRoot()
  const relPath = messageRelPath(to, id)
  if (!existsSync(`${root}/${relPath}`)) return false
  if (msOf(uncommittedIn(root, relPath)?.[CLAIMED_AT_KEY]) !== null) return false
  mergeUncommitted(root, relPath, { [CLAIMED_AT_KEY]: new Date(atMs).toISOString() })
  return true
}

export function releaseClaim(to: string, id: string): undefined {
  removeUncommitted(akashaRoot(), messageRelPath(to, id))
}

export async function takeMessage(
  to: string,
  id: string,
  sending: Sending = overHttp
): Promise<Taken> {
  const root = akashaRoot()
  const relPath = messageRelPath(to, id)
  if (!existsSync(`${root}/${relPath}`)) {
    removeUncommitted(root, relPath)
    return { kind: "gone" }
  }
  const taken = await sending({
    writer: WRITER,
    message: `message to ${to} is read, and read is the file's absence`,
    removes: [relPath],
  })
  if ("refused" in taken) return { kind: "refused", detail: taken.refused }
  removeUncommitted(root, relPath)
  return { kind: "taken" }
}
