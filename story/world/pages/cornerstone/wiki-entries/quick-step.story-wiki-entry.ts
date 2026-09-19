import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const quickStep = {
  id: "01a0657d-bb95-761a-bd2b-cf29e5572ec4",
  type: "page-type/story-wiki-entry",
  slug: "quick-step",
  title: "Quick-Step",
  world: "world/cornerstone",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
