import { existsSync } from "node:fs"
import { messageNamed } from "akasha/agent/messaging/modules/message-naming/message-naming.module.code.ts"
import { akashaSeatIdForName } from "akasha/agent/seat/page/modules/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import {
  landBodies,
  landRemovals,
} from "akasha/change/modules/gated-landing/gated-landing.module.code.ts"
import { whyRefused } from "akasha/change/modules/gated-write/gated-write.module.code.ts"
import { CEILING } from "akasha/check/code/pages/file-length/file-length.check-code.decision.code.ts"
import { inCluster } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  AKASHA,
  akashaRoot,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  mergeUncommitted,
  removeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { slugAt, textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Writing,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  composedFor,
  type Naming,
  pagesAtFor,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

const MESSAGE = "message"

const PAGE_TYPE = "page-type"

const SEAT = "seat"

const WRITER = "message-file-writer"

const PAGE_EXT = `.${MESSAGE}.ts`

function pagesAt(): string {
  return pagesAtFor(akashaRoot(), MESSAGE)
}

const CLAIMED_AT_KEY = "claimedAt"

export type Warrant = "announce" | "blocked"

export interface Message {
  readonly id: string
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly body: string
  readonly claimedAtMs: number | null
  readonly relPath: string
}

export type Written =
  | { readonly kind: "written"; readonly id: string; readonly relPath: string }
  | { readonly kind: "refused"; readonly detail: string }

export type Taken =
  | { readonly kind: "taken" }
  | { readonly kind: "gone" }
  | { readonly kind: "refused"; readonly detail: string }

export function recipientRefused(to: string): string | null {
  if (to === "") return "a message is addressed to somebody, and this names nobody"
  if (to.includes("/") || to.includes("\\")) {
    return `\`${to}\` spells a path rather than a recipient, and a recipient is one directory`
  }
  if (to.startsWith(".")) return `\`${to}\` starts with a dot, which names no seat or persona`
  return null
}

export function messagesDirRelPath(): string {
  return pagesAt()
}

export function messageDirRelPath(_to: string): string {
  return pagesAt()
}

function messageRelPath(to: string, id: string): string {
  const stem = id.startsWith(`${MESSAGE}-`) ? id : messageNamed(id)
  const found = messagesTo(to).find((one) => one.id === stem)
  return found?.relPath ?? `${pagesAt()}/${stem}${PAGE_EXT}`
}

function unknownRecipient(to: string): string | null {
  let known: boolean
  try {
    known = akashaSeatIdForName(to) !== null
  } catch {
    return null
  }
  if (known) return null
  return (
    `no seat holds the name \`${to}\`, so a message written there would wait in a directory ` +
    `nothing drains. Refused rather than landed, because a send nobody receives must not answer ` +
    `as one that arrived`
  )
}

export type Sending = (asked: Writing) => Promise<Wrote>

export async function writeMessage(
  stated: {
    readonly to: string
    readonly from: string
    readonly warrant: Warrant
    readonly body: string
  },
  sending: Sending = writingFor
): Promise<Written> {
  const refused = recipientRefused(stated.to)
  if (refused !== null) return { kind: "refused", detail: refused }
  const unknown = unknownRecipient(stated.to)
  if (unknown !== null) return { kind: "refused", detail: unknown }
  const id = Bun.randomUUIDv7()
  const slug = messageNamed(id)
  const root = akashaRoot()
  const body = stated.body.endsWith("\n") ? stated.body : `${stated.body}\n`
  const naming: Naming = {
    pageTypeSlug: MESSAGE,
    slug,
    values: {
      id,
      type: namedAs(PAGE_TYPE, MESSAGE, null),
      slug,
      to: namedAs(SEAT, stated.to, null),
      from: stated.from,
      warrant: stated.warrant,
      body,
    },
  }
  const composed = composedFor(root, naming)
  if ("refused" in composed) return { kind: "refused", detail: composed.refused }
  const held = new TextEncoder().encode(composed.put.content).byteLength
  if (held > CEILING) {
    return {
      kind: "refused",
      detail:
        `a message page of ${held} bytes is over the ${CEILING} byte ceiling a file is held to, ` +
        `and a page over that ceiling can never be changed again, so send fewer words`,
    }
  }
  const said = `message to ${stated.to} from ${stated.from}`
  const written: Written = { kind: "written", id: slug, relPath: composed.put.path }
  if (inCluster()) {
    const wrote = await sending({ writer: WRITER, message: said, pages: [naming] })
    return "refused" in wrote ? { kind: "refused", detail: wrote.refused } : written
  }
  const landed = await landBodies({ repo: AKASHA, writer: WRITER, message: said }, [
    { relPath: composed.put.path, body: composed.put.content },
  ])
  return landed.ok ? written : { kind: "refused", detail: whyRefused(landed.why) }
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

export async function takeMessage(to: string, id: string): Promise<Taken> {
  const root = akashaRoot()
  const relPath = messageRelPath(to, id)
  if (!existsSync(`${root}/${relPath}`)) {
    removeUncommitted(root, relPath)
    return { kind: "gone" }
  }
  const taken = await landRemovals(
    {
      repo: AKASHA,
      writer: WRITER,
      message: `message to ${to} is read, and read is the file's absence`,
    },
    [relPath]
  )
  if (!taken.ok) return { kind: "refused", detail: whyRefused(taken.why) }
  removeUncommitted(root, relPath)
  return { kind: "taken" }
}
