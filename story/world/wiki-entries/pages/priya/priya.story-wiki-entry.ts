import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const priya = {
  id: "01a0657d-bb97-7013-ae06-03573f6b89f1",
  type: "page-type/story-wiki-entry",
  slug: "priya",
  title: "Priya",
  world: "world/tower-of-nimue",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
