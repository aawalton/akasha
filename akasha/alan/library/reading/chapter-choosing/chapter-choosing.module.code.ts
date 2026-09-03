import {
  LITRPG_RATINGS,
  type LitrpgCatalog,
  type LitrpgChapter,
  type LitrpgRating,
  type LitrpgStory,
  type Pool,
  type SelectOptions,
} from "../reading-shapes/reading-shapes.module.code.ts"
import {
  type ChapterLength,
  resolveResumeChapter,
} from "../resume-chapter/resume-chapter.module.code.ts"

export const LIKED_RATINGS: ReadonlySet<LitrpgRating> = new Set<LitrpgRating>([
  "B-",
  "B",
  "B+",
  "A-",
  "A",
  "A+",
  "S-",
  "S",
  "S+",
])

export const EXCLUDED_STATUSES: ReadonlySet<string> = new Set([
  "Completed",
  "Archived",
  "Paused",
  "Not Applicable",
])
export const IN_PROGRESS_STATUSES: ReadonlySet<string> = new Set(["Following", "In Progress"])
export const ARCHIVED_STATUS = "Archived"

export function isLiked(grade: LitrpgRating | undefined): boolean {
  return grade !== undefined && LIKED_RATINGS.has(grade)
}

export function gradeValue(grade: LitrpgRating | undefined): number {
  return grade === undefined ? -1 : LITRPG_RATINGS.indexOf(grade)
}

export function compareChapters(a: LitrpgChapter, b: LitrpgChapter): number {
  const na = a.chapterNumber ?? Number.POSITIVE_INFINITY
  const nb = b.chapterNumber ?? Number.POSITIVE_INFINITY
  if (na !== nb) return na - nb
  if (a.title !== b.title) return a.title < b.title ? -1 : 1
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
}

export function isFullyRead(c: LitrpgChapter): boolean {
  return c.completedAt != null
}

export function buildChaptersByStory(catalog: LitrpgCatalog): Map<string, LitrpgChapter[]> {
  const map = new Map<string, LitrpgChapter[]>()
  for (const chapter of catalog.chapters) {
    const list = map.get(chapter.storyId)
    if (list === undefined) map.set(chapter.storyId, [chapter])
    else list.push(chapter)
  }
  return map
}

export function hasGradeSignal(
  story: LitrpgStory,
  chaptersByStory: ReadonlyMap<string, readonly LitrpgChapter[]>
): boolean {
  if (story.grade !== undefined) return true
  const chapters = chaptersByStory.get(story.id) ?? []
  return chapters.some((c) => c.grade !== undefined)
}

export function storyPool(
  story: LitrpgStory,
  chaptersByStory: ReadonlyMap<string, readonly LitrpgChapter[]>,
  options: SelectOptions
): Pool {
  const status = story.status
  if (status === ARCHIVED_STATUS)
    return options.includeArchived === true ? "in-progress" : "excluded"
  if (status !== undefined && EXCLUDED_STATUSES.has(status)) return "excluded"
  if (status !== undefined && IN_PROGRESS_STATUSES.has(status)) return "in-progress"
  return hasGradeSignal(story, chaptersByStory) ? "in-progress" : "exploration"
}

export function resumeFloor(
  story: LitrpgStory,
  chaptersByStory: ReadonlyMap<string, readonly LitrpgChapter[]>
): number | null {
  const chapters = chaptersByStory.get(story.id) ?? []
  const lengths: ChapterLength[] = chapters
    .filter((c): c is LitrpgChapter & { chapterNumber: number } => c.chapterNumber !== undefined)
    .map((c) => ({
      chapterNumber: c.chapterNumber,
      ...(c.length !== undefined && { length: c.length }),
    }))
  return resolveResumeChapter({
    chapters: lengths,
    ...(story.progress !== undefined && { bookmarkWords: story.progress }),
    ...(story.length !== undefined && { totalWords: story.length }),
    ...(story.chapterCount !== undefined && { chapterCount: story.chapterCount }),
  })
}

export function selectUnreadChapters(
  catalog: LitrpgCatalog,
  storyId: string
): readonly LitrpgChapter[] {
  const chaptersByStory = buildChaptersByStory(catalog)
  const story = catalog.stories.find((s) => s.id === storyId)
  const floor = story !== undefined ? resumeFloor(story, chaptersByStory) : 1
  if (floor === null) return []
  return (chaptersByStory.get(storyId) ?? [])
    .filter(
      (c) =>
        c.grade === undefined &&
        !isFullyRead(c) &&
        (c.chapterNumber ?? Number.POSITIVE_INFINITY) >= floor
    )
    .sort(compareChapters)
}

export function selectNextChapter(catalog: LitrpgCatalog, storyId: string): LitrpgChapter | null {
  return selectUnreadChapters(catalog, storyId)[0] ?? null
}

export function selectReadAheadChapterIds(
  catalog: LitrpgCatalog,
  storyId: string,
  k: number
): readonly string[] {
  if (k <= 0) return []
  return selectUnreadChapters(catalog, storyId)
    .slice(0, k)
    .map((c) => c.id)
}

export function storyIsLiked(
  story: LitrpgStory,
  chaptersByStory: ReadonlyMap<string, readonly LitrpgChapter[]>
): boolean {
  if (isLiked(story.grade)) return true
  const chapters = chaptersByStory.get(story.id) ?? []
  return chapters.some((c) => isLiked(c.grade))
}

export function loveScore(
  story: LitrpgStory,
  chaptersByStory: ReadonlyMap<string, readonly LitrpgChapter[]>
): number {
  const chapters = chaptersByStory.get(story.id) ?? []
  const likedChapters = chapters.filter((c) => isLiked(c.grade)).length
  return gradeValue(story.grade) * 100 + likedChapters
}

export function genreOverlap(a: readonly string[], b: ReadonlySet<string>): number {
  let n = 0
  for (const g of a) if (b.has(g)) n++
  return n
}

export function genreJaccard(a: readonly string[], b: readonly string[]): number {
  if (a.length === 0 && b.length === 0) return 0
  const setB = new Set(b)
  const inter = genreOverlap(a, setB)
  const union = new Set([...a, ...b]).size
  return union === 0 ? 0 : inter / union
}

export interface ScoredStory {
  readonly story: LitrpgStory
  readonly adjacency: number
  readonly sharedWithUnion: number
}

export function selectInProgressPool(
  catalog: LitrpgCatalog,
  chaptersByStory: ReadonlyMap<string, readonly LitrpgChapter[]>,
  options: SelectOptions
): readonly LitrpgStory[] {
  return catalog.stories
    .filter(
      (s) =>
        storyPool(s, chaptersByStory, options) === "in-progress" &&
        selectNextChapter(catalog, s.id) !== null
    )
    .sort((a, b) => {
      const la = loveScore(a, chaptersByStory)
      const lb = loveScore(b, chaptersByStory)
      if (la !== lb) return lb - la
      if (a.title !== b.title) return a.title < b.title ? -1 : 1
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
    })
}

export function selectLastRead(catalog: LitrpgCatalog, storyId: string): LitrpgChapter | null {
  const chaptersByStory = buildChaptersByStory(catalog)
  const story = catalog.stories.find((s) => s.id === storyId)
  const floor = story !== undefined ? resumeFloor(story, chaptersByStory) : null
  const chapters = (chaptersByStory.get(storyId) ?? []).slice().sort(compareChapters)

  const graded = chapters.filter((c) => c.grade !== undefined)
  if (graded.length > 0) return graded[graded.length - 1] ?? null

  if (floor === null) return chapters[chapters.length - 1] ?? null
  const before = chapters.filter((c) => (c.chapterNumber ?? Number.POSITIVE_INFINITY) < floor)
  return before[before.length - 1] ?? null
}
