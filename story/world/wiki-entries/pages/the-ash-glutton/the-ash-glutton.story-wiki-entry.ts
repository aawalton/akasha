import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const theAshGlutton = {
  id: "01a0657d-bb98-7262-b0fc-900662761703",
  type: "page-type/story-wiki-entry",
  slug: "the-ash-glutton",
  title: "The Ash-Glutton",
  world: "world/tower-of-nimue",
  kind: "character",
  chapterNumber: 2,
  prose: "txt",
} as const satisfies StoryWikiEntry
