import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const theFirstBuried = {
  id: "01a0657d-bb95-7bcc-a71c-6bd30b22220b",
  type: "page-type/story-wiki-entry",
  slug: "the-first-buried",
  title: "The First Buried",
  world: "world/cornerstone",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
