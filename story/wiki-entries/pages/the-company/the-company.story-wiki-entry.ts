import type { StoryWikiEntry } from "../../story-wiki-entry.page-type.ts"

export const theCompany = {
  id: "01a0657d-bb96-7b10-b7ec-4b51cff80a4f",
  pageTypeSlug: "story-wiki-entry",
  slug: "the-company",
  title: "The Company",
  worldSlug: "the-beholder",
  kind: "location",
  chapterNumber: 1,
  prose: "txt",
} as const satisfies StoryWikiEntry
