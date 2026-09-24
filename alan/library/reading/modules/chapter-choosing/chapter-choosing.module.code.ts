import {
  type ChapterLength,
  resolveResumeChapter,
} from "akasha/alan/library/reading/modules/resume-chapter/resume-chapter.module.code.ts"
import type {
  LitrpgCatalog,
  LitrpgChapter,
  LitrpgStory,
} from "akasha/alan/library/reading/modules/shapes/reading-shapes.module.code.ts"

function compareChapters(a: LitrpgChapter, b: LitrpgChapter): number {
  const na = a.chapterNumber ?? Number.POSITIVE_INFINITY
  const nb = b.chapterNumber ?? Number.POSITIVE_INFINITY
  if (na !== nb) return na - nb
  if (a.title !== b.title) return a.title < b.title ? -1 : 1
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
}

function isFullyRead(c: LitrpgChapter): boolean {
  return c.completedAt != null
}

function buildChaptersByStory(catalog: LitrpgCatalog): Map<string, LitrpgChapter[]> {
  const map = new Map<string, LitrpgChapter[]>()
  for (const chapter of catalog.chapters) {
    const list = map.get(chapter.storyId)
    if (list === undefined) map.set(chapter.storyId, [chapter])
    else list.push(chapter)
  }
  return map
}

function resumeFloor(
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

function selectUnreadChapters(catalog: LitrpgCatalog, storyId: string): readonly LitrpgChapter[] {
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
