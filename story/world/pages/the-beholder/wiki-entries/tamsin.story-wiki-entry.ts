import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const tamsin = {
  id: "01a0657d-bb96-77c8-a18d-593d6508ccac",
  type: "page-type/story-wiki-entry",
  slug: "tamsin",
  title: "Tamsin",
  world: "world/the-beholder",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
