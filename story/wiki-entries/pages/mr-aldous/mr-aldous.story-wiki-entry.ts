import type { StoryWikiEntry } from "akasha/story/wiki-entries/story-wiki-entry.page-type.types.ts"

export const mrAldous = {
  id: "01a0657d-bb96-7c32-bbda-1f313037ad91",
  type: "story-wiki-entry",
  slug: "mr-aldous",
  title: "Mr. Aldous",
  world: "the-beholder",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
