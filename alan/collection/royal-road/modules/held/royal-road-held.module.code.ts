import {
  idFrom,
  linkFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { listedById } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  asking,
  type Row,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

const CHAPTER_PAGE_TYPE = "story-chapter-read"
const SOURCE = "royal-road"
const IDENTITY = "externalIdentity"
const PAGE_ID = "id"
const SLUG = "slug"
const LENGTH = "ownLength"
const CHAPTER_AT = /\/chapter\/(\d+)/

export interface Held {
  readonly ids: ReadonlySet<string>
  readonly slugs: ReadonlySet<string>
  readonly extras: readonly string[]
}

interface Copy {
  readonly pageId: string
  readonly worded: boolean
}

function chapterIdIn(row: Row): string | null {
  const held = idFrom(row[IDENTITY], SOURCE)
  if (held !== null) return held
  const link = linkFrom(row[IDENTITY], SOURCE)
  return link === null ? null : firstCapture(CHAPTER_AT.exec(link))
}

function keptFirst(one: Copy, two: Copy): number {
  if (one.worded !== two.worded) return one.worded ? -1 : 1
  return one.pageId < two.pageId ? -1 : one.pageId > two.pageId ? 1 : 0
}

export function heldChapters(root: string): Held {
  const asked = asking(root, {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    keys: [PAGE_ID, SLUG, IDENTITY, LENGTH],
  })
  if ("refused" in asked) {
    throw new Error(
      `the chapters already filed went unread, so every chapter royal road lists would read as ` +
        `new and be filed again: ${asked.refused}`
    )
  }
  if (asked.rows.length === 0) {
    throw new Error(
      `${CHAPTER_PAGE_TYPE} answered with no chapter at all. An empty answer is a broken read ` +
        `rather than an empty shelf, and syncing on it would file every chapter a second time.`
    )
  }
  const slugs = new Set<string>()
  const copies = new Map<string, Copy[]>()
  for (const row of asked.rows) {
    const slug = textAt(row, SLUG)
    if (slug !== null) slugs.add(slug)
    const id = chapterIdIn(row)
    const pageId = textAt(row, PAGE_ID)
    if (id === null || pageId === null) continue
    const length = row[LENGTH]
    const held = copies.get(id) ?? []
    held.push({ pageId, worded: typeof length === "number" && length > 0 })
    copies.set(id, held)
  }
  const extras: string[] = []
  for (const held of copies.values()) {
    extras.push(
      ...[...held]
        .sort(keptFirst)
        .slice(1)
        .map((one) => one.pageId)
    )
  }
  return { ids: new Set(copies.keys()), slugs, extras }
}

export function extraPaths(root: string, held: Held): readonly string[] {
  return held.extras.map((pageId) => {
    const listed = listedById(root, pageId)
    if (listed === null) {
      throw new Error(`${pageId} is held as a second copy of a chapter and is filed nowhere`)
    }
    return listed.path
  })
}
