import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const slowTread = {
  id: "01a0657d-bb95-791f-a3b7-e4ae2b33bc6d",
  type: "page-type/story-wiki-entry",
  slug: "slow-tread",
  title: "Slow-Tread",
  world: "world/cornerstone",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
