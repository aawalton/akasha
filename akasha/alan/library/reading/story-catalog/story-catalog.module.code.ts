import type { ComposedQuery } from "@akasha/pages-query/ask"
import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import { z } from "zod"
import {
  LITRPG_RATINGS,
  type LitrpgCatalog,
  type LitrpgChapter,
  type LitrpgRating,
  type LitrpgStory,
} from "../reading-shapes/reading-shapes.module.code.ts"

export const CHAPTER_TYPE_BY_STORY_TYPE: Readonly<Record<string, string>> = {
  "story-read": "story-chapter-read",
  "story-played": "story-chapter-played",
  "story-written": "story-chapter-written",
}

const STORY_TYPES = Object.keys(CHAPTER_TYPE_BY_STORY_TYPE)

const STORY_KEYS = ["id", "title", "slug", "ownProgress", "ownLength"]
const CHAPTER_KEYS = ["id", "title", "slug", "position", "ownLength", "ownProgress", "completedAt"]

const ASK_LIMIT = 50_000

function numberOr(raw: unknown): number | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined
  const n = Number(raw)
  return Number.isFinite(n) ? n : undefined
}

async function askRows(
  query: ComposedQuery
): Promise<readonly Readonly<Record<string, unknown>>[]> {
  const asked = await askComposed(query)
  if (!asked.ok) throw new Error(`litrpg catalog: \`${query["page-type"]}\`: ${asked.why}`)
  const rows = asked.answer.rows
  if (query.limit === ASK_LIMIT && rows.length === ASK_LIMIT) {
    throw new Error(
      `litrpg catalog: \`${query["page-type"]}\` filled the ${ASK_LIMIT} row limit, so the catalog cannot tell a whole answer from a short one`
    )
  }
  return rows.map((row) => row.values)
}

function chapterRecordOf(
  values: Readonly<Record<string, unknown>>,
  storyId: string,
  pageTypeSlug: string
): Record<string, unknown> {
  return {
    id: String(values.id ?? ""),
    title: values.title ?? "",
    story: storyId,
    pageTypeSlug,
    chapterNumber: numberOr(values.position),
    length: numberOr(values.ownLength),
    progress: numberOr(values.ownProgress),
    completedAt: values.completedAt ?? undefined,
  }
}

function storyRecordOf(values: Readonly<Record<string, unknown>>): Record<string, unknown> {
  return {
    id: String(values.id ?? ""),
    title: values.title ?? "",
    slug: values.slug ?? "",
    progress: numberOr(values.ownProgress),
    length: numberOr(values.ownLength),
  }
}

function coerceGrade(raw: unknown): LitrpgRating | undefined {
  return typeof raw === "string" ? LITRPG_RATINGS.find((r) => r === raw) : undefined
}

const storyRefSchema = z
  .union([
    z.string(),
    z.object({ id: z.string() }).passthrough(),
    z.array(z.union([z.string(), z.object({ id: z.string() }).passthrough()])),
  ])
  .catch("")

export function storyRelId(raw: unknown): string {
  const parsed = storyRefSchema.parse(raw)
  const first = Array.isArray(parsed) ? parsed[0] : parsed
  if (first === undefined || first === "") return ""
  return typeof first === "string" ? first : first.id
}

const storyRowSchema = z
  .object({
    id: z.string(),
    title: z.string().nullish(),
    genre: z.array(z.string()).nullish(),
    grade: z.unknown().optional(),
    status: z.string().nullish(),
    progress: z.number().nullish(),
    length: z.number().nullish(),
    chapterCount: z.number().nullish(),
  })
  .passthrough()

const chapterRowSchema = z
  .object({
    id: z.string(),
    title: z.string().nullish(),
    story: z.unknown().optional(),
    chapterNumber: z.number().nullish(),
    length: z.number().nullish(),
    progress: z.number().nullish(),
    completedAt: z.string().nullish(),
    grade: z.unknown().optional(),
    pageTypeSlug: z.string().nullish(),
  })
  .passthrough()

export function rowToLitrpgStory(row: Record<string, unknown>): LitrpgStory {
  const parsed = storyRowSchema.parse(row)
  const grade = coerceGrade(parsed.grade)
  return {
    id: parsed.id,
    title: parsed.title ?? "",
    genres: parsed.genre ?? [],
    ...(grade !== undefined && { grade }),
    ...(parsed.status != null && { status: parsed.status }),
    ...(parsed.progress != null && { progress: parsed.progress }),
    ...(parsed.length != null && { length: parsed.length }),
    ...(parsed.chapterCount != null && { chapterCount: parsed.chapterCount }),
  }
}

export function rowToLitrpgChapter(row: Record<string, unknown>): LitrpgChapter {
  const parsed = chapterRowSchema.parse(row)
  const grade = coerceGrade(parsed.grade)
  return {
    id: parsed.id,
    title: parsed.title ?? "",
    storyId: storyRelId(parsed.story),
    ...(parsed.chapterNumber != null && { chapterNumber: parsed.chapterNumber }),
    ...(parsed.length != null && { length: parsed.length }),
    ...(parsed.progress != null && { progress: parsed.progress }),
    ...(parsed.completedAt != null && { completedAt: parsed.completedAt }),
    ...(parsed.pageTypeSlug != null && { pageTypeSlug: parsed.pageTypeSlug }),
    ...(grade !== undefined && { grade }),
  }
}

export function buildStoryCatalog(
  storyRow: Record<string, unknown> | null,
  chapterRows: readonly Record<string, unknown>[]
): LitrpgCatalog {
  return {
    stories: storyRow === null ? [] : [rowToLitrpgStory(storyRow)],
    chapters: chapterRows.map(rowToLitrpgChapter),
  }
}

async function findStoryById(
  storyId: string
): Promise<{ readonly values: Readonly<Record<string, unknown>>; readonly type: string } | null> {
  for (const type of STORY_TYPES) {
    const rows = await askRows({
      "page-type": type,
      where: { id: { is: storyId } },
      keys: STORY_KEYS,
      limit: 1,
    })
    const values = rows[0]
    if (values !== undefined) return { values, type }
  }
  return null
}

export async function loadStoryCatalog(storyId: string): Promise<LitrpgCatalog> {
  const found = await findStoryById(storyId)
  if (found === null) return { stories: [], chapters: [] }
  const chapterType = CHAPTER_TYPE_BY_STORY_TYPE[found.type]
  if (chapterType === undefined)
    return { stories: [rowToLitrpgStory(storyRecordOf(found.values))], chapters: [] }
  const slug = String(found.values.slug ?? "")
  const chapterRows = await askRows({
    "page-type": chapterType,
    where: { partOfSlugs: { has: slug } },
    keys: CHAPTER_KEYS,
    "sort-by": "position",
    limit: ASK_LIMIT,
  })
  return buildStoryCatalog(
    storyRecordOf(found.values),
    chapterRows.map((values) => chapterRecordOf(values, storyId, chapterType))
  )
}

export async function loadLitrpgCatalog(): Promise<LitrpgCatalog> {
  const stories: LitrpgStory[] = []
  const chapters: LitrpgChapter[] = []
  for (const storyType of STORY_TYPES) {
    const chapterType = CHAPTER_TYPE_BY_STORY_TYPE[storyType]
    if (chapterType === undefined) continue
    const storyRows = await askRows({
      "page-type": storyType,
      keys: STORY_KEYS,
      limit: ASK_LIMIT,
    })
    const idBySlug = new Map<string, string>()
    for (const values of storyRows) {
      const record = storyRecordOf(values)
      stories.push(rowToLitrpgStory(record))
      idBySlug.set(String(record.slug), String(record.id))
    }
    const chapterRows = await askRows({
      "page-type": chapterType,
      keys: [...CHAPTER_KEYS, "partOfSlugs"],
      limit: ASK_LIMIT,
    })
    for (const values of chapterRows) {
      const said = values.partOfSlugs
      const partOf = Array.isArray(said) ? String(said[0] ?? "") : String(said ?? "")
      const storyId = idBySlug.get(partOf) ?? ""
      chapters.push(rowToLitrpgChapter(chapterRecordOf(values, storyId, chapterType)))
    }
  }
  return { stories, chapters }
}
