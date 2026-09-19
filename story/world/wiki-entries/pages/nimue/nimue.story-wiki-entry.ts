import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const nimue = {
  id: "01a0657d-bb97-7be4-81e0-56e20296e8b2",
  type: "page-type/story-wiki-entry",
  slug: "nimue",
  title: "Nimue",
  world: "world/tower-of-nimue",
  kind: "character",
  chapterNumber: 2,
  prose: "txt",
} as const satisfies StoryWikiEntry
