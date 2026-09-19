import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const mrAldous = {
  id: "01a0657d-bb96-7c32-bbda-1f313037ad91",
  type: "page-type/story-wiki-entry",
  slug: "mr-aldous",
  title: "Mr. Aldous",
  world: "world/the-beholder",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
