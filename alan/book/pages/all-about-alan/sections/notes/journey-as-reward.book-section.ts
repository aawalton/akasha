import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const journeyAsReward = {
  id: "01a06594-c67a-7015-9129-1df3e02537b9",
  type: "page-type/book-section",
  slug: "journey-as-reward",
  title: "Journey as reward",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
