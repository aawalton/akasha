import type { StoryWikiEntry } from "akasha/story/wiki-entries/story-wiki-entry.page-type.types.ts"

export const pearl = {
  id: "01a0657d-bb96-7e65-bb52-ebf7a456a5e2",
  type: "story-wiki-entry",
  slug: "pearl",
  title: "Pearl",
  world: "the-beholder",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
