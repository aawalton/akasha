import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const journeyAsReward = {
  id: "01a06594-c67a-7015-9129-1df3e02537b9",
  pageTypeSlug: "book-section",
  slug: "journey-as-reward",
  title: "Journey as reward",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
