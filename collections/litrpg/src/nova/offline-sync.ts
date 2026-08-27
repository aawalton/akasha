import { Page } from "@shared/pages-core/page-types"
import { patchPage } from "@shared/pages-query"
import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import { z } from "zod"

const READ_STORY_TYPES = ["story-read-royal-road", "story-read-wandering-inn"] as const
const READ_CHAPTER_TYPES = ["story-chapter-royal-road", "story-chapter-wandering-inn"] as const

const EAGER_STORY_TYPE = "story-read-wandering-inn"
const FOLLOWING_KEY = "following"

const WRITER = "offline-text-sync"
const ASK_LIMIT = 20_000

type Values = Readonly<Record<string, unknown>>

async function askRows(
  query: ComposedQuery
): Promise<readonly { readonly at?: string; readonly values: Values }[]> {
  const asked = await askComposed(query)
  if (!asked.ok) throw new Error(`litrpg offline-sync: \`${query["page-type"]}\`: ${asked.why}`)
  return asked.answer.rows
}

export function nameOfAt(at: string): string {
  const withoutRepo = at.slice(at.indexOf(":") + 1)
  return withoutRepo.endsWith(".md") ? withoutRepo.slice(0, -".md".length) : withoutRepo
}

async function idsFrom(
  pageType: string,
  where?: Readonly<Record<string, unknown>>
): Promise<string[]> {
  const rows = await askRows({
    "page-type": pageType,
    keys: ["id"],
    limit: ASK_LIMIT,
    ...(where === undefined ? {} : { where }),
  })
  return rows.flatMap((row) => (typeof row.values.id === "string" ? [row.values.id] : []))
}

export async function loadReadingActiveStoryIds(): Promise<string[]> {
  const ids = new Set<string>()
  for (const type of READ_STORY_TYPES) {
    for (const id of await idsFrom(type, { [FOLLOWING_KEY]: { is: "true" } })) ids.add(id)
  }
  return [...ids]
}

export async function loadEagerCarveoutStoryIds(): Promise<string[]> {
  const ids = new Set<string>()
  for (const id of await idsFrom(EAGER_STORY_TYPE)) ids.add(id)
  for (const id of await idsFrom("story-read-royal-road", { [FOLLOWING_KEY]: { is: "true" } })) {
    ids.add(id)
  }
  return [...ids]
}

type FoundChapter = {
  readonly pageType: string
  readonly name: string
  readonly values: Values
}

async function findChapterById(
  chapterId: string,
  keys: readonly string[]
): Promise<FoundChapter | null> {
  for (const pageType of READ_CHAPTER_TYPES) {
    const rows = await askRows({
      "page-type": pageType,
      where: { id: { is: chapterId } },
      keys: [...keys],
      limit: 1,
    })
    const row = rows[0]
    if (row !== undefined && row.at !== undefined) {
      return { pageType, name: nameOfAt(row.at), values: row.values }
    }
  }
  return null
}

const chapterProseRowSchema = z.object({ body: z.string().nullable().optional() }).passthrough()

export async function loadChapterForOffline(chapterId: string): Promise<Page | null> {
  const found = await findChapterById(chapterId, ["id", "title", "position", "ownLength", "body"])
  if (found === null) return null
  const parsed = chapterProseRowSchema.parse(found.values)
  if (parsed.body == null || parsed.body === "") return null
  return Page({ ...found.values, text: parsed.body })
}

export async function writeChapterCompletion(
  pageId: string,
  completedAtMs: number,
  size: number
): Promise<void> {
  const found = await findChapterById(pageId, ["id"])
  if (found === null) throw new Error(`writeChapterCompletion: no chapter carries id \`${pageId}\``)
  const written = await patchPage(
    found.pageType,
    found.name,
    { markedReadAt: new Date(completedAtMs).toISOString(), ownProgress: size },
    WRITER
  )
  if (!written.ok) throw new Error(`writeChapterCompletion(${pageId}): ${written.why}`)
}

export async function writeChapterPosition(pageId: string, progress: number): Promise<void> {
  const found = await findChapterById(pageId, ["id", "ownProgress"])
  if (found === null) throw new Error(`writeChapterPosition: no chapter carries id \`${pageId}\``)
  const raw = found.values.ownProgress
  const current = raw == null || raw === "" ? null : Number(raw)
  if (current != null && Number.isFinite(current) && progress <= current) return
  const written = await patchPage(found.pageType, found.name, { ownProgress: progress }, WRITER)
  if (!written.ok) throw new Error(`writeChapterPosition(${pageId}): ${written.why}`)
}
