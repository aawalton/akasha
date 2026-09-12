export interface ChapterLength {
  readonly chapterNumber: number
  readonly length?: number
}

export interface ResumeInputs {
  readonly chapters: readonly ChapterLength[]
  readonly bookmarkWords?: number
  readonly totalWords?: number
  readonly chapterCount?: number
}

function sortedByNumber(chapters: readonly ChapterLength[]): readonly ChapterLength[] {
  return [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber)
}

function hasRealLengths(chapters: readonly ChapterLength[]): boolean {
  return chapters.some((c) => typeof c.length === "number" && c.length > 0)
}

export function resolveResumeChapter(inputs: ResumeInputs): number | null {
  const chapters = sortedByNumber(inputs.chapters)
  const bookmark = inputs.bookmarkWords ?? 0

  const first = chapters[0]
  if (bookmark <= 0) return first?.chapterNumber ?? null

  if (chapters.length > 0 && hasRealLengths(chapters)) {
    let cumulative = 0
    for (const chapter of chapters) {
      cumulative += chapter.length ?? 0
      if (bookmark < cumulative) return chapter.chapterNumber
    }
    return null
  }

  const total = inputs.totalWords ?? 0
  const count = inputs.chapterCount ?? chapters.length
  if (total <= 0 || count <= 0) return first?.chapterNumber ?? null
  if (bookmark >= total) return null
  const chaptersDone = Math.floor((bookmark / total) * count)
  const resumeIndex = Math.min(chaptersDone, count - 1)
  return chapters[resumeIndex]?.chapterNumber ?? resumeIndex + 1
}
