import type { HeldChapter } from "akasha/alan/collection/royal-road/modules/held/royal-road-held.module.code.ts"
import type { RawChapter } from "akasha/alan/collection/royal-road/modules/pages/royal-road-pages.module.code.ts"
import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { composedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const CHAPTER_PAGE_TYPE = "story-chapter-read"
const PROGRESS = "ownProgress"
const RESTATE = `${changeMechanicalFile.slug}/${addIfNotPresentFile.slug}` as const

type Restated = Extract<Asking, { at: typeof RESTATE }>

export function readThrough(
  held: readonly HeldChapter[],
  listed: readonly RawChapter[],
  lastRead: RawChapter
): readonly HeldChapter[] {
  const orderOf = new Map(listed.map((one) => [one.id, one.order]))
  const lastDay = lastRead.date.slice(0, 10)
  return held.filter((one) => {
    if (one.ownLength <= 0 || one.ownProgress >= one.ownLength) return false
    const order = orderOf.get(one.chapterId)
    if (order !== undefined) return order <= lastRead.order
    return one.publishedAt !== null && one.publishedAt < lastDay
  })
}

interface Progressed {
  readonly named: string
  readonly changes: readonly Restated[]
}

function progressed(root: string, chapter: HeldChapter): Progressed {
  const named = `${CHAPTER_PAGE_TYPE}/${chapter.slug}`
  const composed = composedFor(root, {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    slug: chapter.slug,
    values: { slug: chapter.slug, [PROGRESS]: chapter.ownLength },
    merge: true,
  })
  if ("refused" in composed) {
    throw new Error(`${named} was composed by nothing: ${composed.refused}`)
  }
  return {
    named,
    changes: [{ at: RESTATE, given: { at: composed.put.path, body: composed.put.content } }],
  }
}

export function readUpTo(
  root: string,
  held: readonly HeldChapter[],
  listed: readonly RawChapter[],
  lastReadId: string | null
): readonly Progressed[] {
  if (lastReadId === null) return []
  const lastRead = listed.find((one) => one.id === lastReadId)
  if (lastRead === undefined) {
    console.log(`    last read ${lastReadId} is not listed, so no chapter is read through it`)
    return []
  }
  const raising = readThrough(held, listed, lastRead)
  if (raising.length > 0) {
    console.log(`    ${raising.length} chapter(s) read through ${lastRead.title}`)
  }
  return raising.map((one) => progressed(root, one))
}
