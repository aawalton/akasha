import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const marcus = {
  id: "01a0657d-bb97-7d97-80f2-8ec1a0b55dac",
  type: "page-type/story-wiki-entry",
  slug: "marcus",
  title: "Marcus",
  world: "world/tower-of-nimue",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
