import {
  buildChaptersByStory,
  genreJaccard,
  genreOverlap,
  type ScoredStory,
  selectInProgressPool,
  selectLastRead,
  selectNextChapter,
  storyIsLiked,
  storyPool,
} from "../chapter-choosing/chapter-choosing.module.code.ts"
import type {
  LitrpgCatalog,
  LitrpgSelection,
  LitrpgStory,
  NowReading,
  SelectOptions,
} from "../reading-shapes/reading-shapes.module.code.ts"

export function selectNextStory(
  catalog: LitrpgCatalog,
  options: SelectOptions = {}
): LitrpgStory | null {
  const chaptersByStory = buildChaptersByStory(catalog)
  const candidates = catalog.stories.filter(
    (s) =>
      storyPool(s, chaptersByStory, options) === "exploration" &&
      selectNextChapter(catalog, s.id) !== null
  )
  if (candidates.length === 0) return null

  const loved = catalog.stories.filter((s) => storyIsLiked(s, chaptersByStory))

  if (loved.length === 0) {
    const sorted = [...candidates].sort((a, b) => {
      if (a.title !== b.title) return a.title < b.title ? -1 : 1
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
    })
    return sorted[0] ?? null
  }

  const lovedGenreUnion = new Set<string>()
  for (const l of loved) for (const g of l.genres) lovedGenreUnion.add(g)

  const scored: ScoredStory[] = candidates.map((story) => {
    let adjacency = 0
    for (const l of loved) {
      const score = genreJaccard(story.genres, l.genres)
      if (score > adjacency) adjacency = score
    }
    return { story, adjacency, sharedWithUnion: genreOverlap(story.genres, lovedGenreUnion) }
  })

  scored.sort((a, b) => {
    if (a.adjacency !== b.adjacency) return b.adjacency - a.adjacency
    if (a.sharedWithUnion !== b.sharedWithUnion) return b.sharedWithUnion - a.sharedWithUnion
    if (a.story.title !== b.story.title) return a.story.title < b.story.title ? -1 : 1
    return a.story.id < b.story.id ? -1 : a.story.id > b.story.id ? 1 : 0
  })

  return scored[0]?.story ?? null
}

export function selectNowReading(
  catalog: LitrpgCatalog,
  options: SelectOptions = {}
): NowReading | null {
  const chaptersByStory = buildChaptersByStory(catalog)
  const story = selectInProgressPool(catalog, chaptersByStory, options)[0]
  if (story === undefined) return null
  return {
    story,
    lastRead: selectLastRead(catalog, story.id),
    nextChapter: selectNextChapter(catalog, story.id),
  }
}

export function selectNextExploration(
  catalog: LitrpgCatalog,
  options: SelectOptions = {}
): LitrpgSelection {
  const chaptersByStory = buildChaptersByStory(catalog)

  const inProgressStory = selectInProgressPool(catalog, chaptersByStory, options)[0]
  if (inProgressStory !== undefined) {
    const chapter = selectNextChapter(catalog, inProgressStory.id)
    if (chapter !== null) {
      return { kind: "chapter-in-progress-story", story: inProgressStory, chapter }
    }
  }

  const newStory = selectNextStory(catalog, options)
  if (newStory !== null) {
    const firstChapter = selectNextChapter(catalog, newStory.id)
    if (firstChapter !== null) return { kind: "new-story", story: newStory, firstChapter }
  }

  return { kind: "exhausted" }
}
