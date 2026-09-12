import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { entriesAt } from "akasha/pages/entries/page-entries.module.code.ts"
import { ENTRY_CEILING } from "akasha/pages/entry-ceiling/entry-ceiling.module.code.ts"
import { queueAt } from "akasha/pages/entry-queue/page-entry-queue.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { partFiled } from "akasha/pages/indexes/path/index-path.index.code.ts"
import { everyOfType, listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

export const NOTIFICATION_FEED_PAGE_TYPE_SLUG = "notification-feed"

const NOTIFICATIONS = "notifications"

const HELD = "jsonl"

const OUTSIDE_THE_COMMIT = true

const NOTIFICATIONS_AT_ONCE = 50

export interface NotifyInput {
  readonly title: string
  readonly body?: string
  readonly link?: string
  readonly kind?: string
  readonly source?: string
}

export interface Notification {
  readonly id: string
  readonly title: string
  readonly body: string
  readonly link: string | null
  readonly kind: string | null
  readonly sentAt: string
  readonly feed: Feed
}

export interface Feed {
  readonly slug: string
  readonly id: string
}

export type Landed =
  | { readonly ok: true; readonly at: string }
  | { readonly ok: false; readonly why: string }

function rowsFor(page: string): readonly Readonly<Record<string, unknown>>[] {
  const read = entriesAt(akashaRoot(), page, NOTIFICATIONS, HELD, OUTSIDE_THE_COMMIT)
  if ("refused" in read) throw new Error(`the feed at \`${page}\` went unread: ${read.refused}`)
  return read.entries as readonly Readonly<Record<string, unknown>>[]
}

export function feedPageFor(personSlug: string): string | null {
  const listed = listedAt(akashaRoot(), NOTIFICATION_FEED_PAGE_TYPE_SLUG, personSlug)[0]
  return listed === undefined ? null : listed.path
}

export async function writeNotification(
  personSlug: string,
  input: NotifyInput,
  _writer: string,
  sentAt: string = new Date().toISOString(),
  id: string = crypto.randomUUID()
): Promise<Landed> {
  const page = feedPageFor(personSlug)
  if (page === null) {
    throw new Error(
      `writeNotification: no notification feed names the person \`${personSlug}\`, so this push reaches nobody`
    )
  }
  const made = queueAt(akashaRoot(), page, NOTIFICATIONS, HELD, ENTRY_CEILING, OUTSIDE_THE_COMMIT)
  if ("refused" in made) return { ok: false, why: made.refused }
  made.queue.write({
    id,
    title: input.title,
    body: input.body ?? null,
    link: input.link ?? null,
    kind: input.kind ?? null,
    source: input.source ?? null,
    "sentAt": sentAt,
    "readAt": null,
  })
  await made.queue.flushed()
  const refused = made.queue.refused()
  if (refused !== null) return { ok: false, why: refused }
  const at = made.queue.at()
  partFiled(akashaRoot(), page, at)
  return { ok: true, at }
}

type Held = {
  readonly feed: Feed
  readonly row: Readonly<Record<string, unknown>>
}

function everyRow(): readonly Held[] {
  const found: Held[] = []
  for (const one of everyOfType(akashaRoot(), NOTIFICATION_FEED_PAGE_TYPE_SLUG)) {
    const said = partedIn(one.path)
    const feed: Feed = { slug: said === null ? "" : said.slug, id: one.id }
    for (const row of rowsFor(one.path)) found.push({ feed, row })
  }
  return found
}

export async function readNotificationsAfter(sentAfter: string): Promise<readonly Notification[]> {
  const kept = everyRow().filter((held) => {
    const at = held.row["sentAt"]
    return typeof at === "string" && at >= sentAfter
  })
  const sorted = [...kept].sort((one, two) =>
    String(one.row["sentAt"]).localeCompare(String(two.row["sentAt"]))
  )
  const read: Notification[] = []
  for (const held of sorted.slice(0, NOTIFICATIONS_AT_ONCE)) {
    const id = textAt(held.row, "id")
    const sentAt = textAt(held.row, "sentAt")
    if (id === null || sentAt === null) continue
    read.push({
      id,
      title: textAt(held.row, "title") ?? "",
      body: textAt(held.row, "body") ?? "",
      link: textAt(held.row, "link"),
      kind: textAt(held.row, "kind"),
      sentAt,
      feed: held.feed,
    })
  }
  return read
}

export interface Sourced {
  readonly source: string | null
  readonly sentAt: string
}

export async function newestOfKind(kind: string, atOnce: number): Promise<readonly Sourced[]> {
  const kept = everyRow().filter((held) => held.row["kind"] === kind)
  const sorted = [...kept].sort((one, two) =>
    String(two.row["sentAt"]).localeCompare(String(one.row["sentAt"]))
  )
  const read: Sourced[] = []
  for (const held of sorted.slice(0, atOnce)) {
    const sentAt = textAt(held.row, "sentAt")
    if (sentAt === null) continue
    read.push({ source: textAt(held.row, "source"), sentAt })
  }
  return read
}

export async function newestNotificationAt(): Promise<string | null> {
  let newest: string | null = null
  for (const held of everyRow()) {
    const at = held.row["sentAt"]
    if (typeof at !== "string" || at === "") continue
    if (newest === null || at > newest) newest = at
  }
  return newest
}
