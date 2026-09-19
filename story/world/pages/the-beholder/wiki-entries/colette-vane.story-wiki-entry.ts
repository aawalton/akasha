import type { StoryWikiEntry } from "akasha/story/world/wiki-entries/story-wiki-entry.page-type.types.ts"

export const coletteVane = {
  id: "01a0657d-bb96-7f0f-878f-0432240daf86",
  type: "page-type/story-wiki-entry",
  slug: "colette-vane",
  title: "Colette Vane",
  world: "world/the-beholder",
  kind: "character",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
