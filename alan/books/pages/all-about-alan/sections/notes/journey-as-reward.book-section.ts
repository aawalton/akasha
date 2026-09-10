import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const journeyAsReward = {
  id: "01a06594-c67a-7015-9129-1df3e02537b9",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "journey-as-reward",
  title: "Journey as reward",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
