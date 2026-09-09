import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const emotionalArchaeology = {
  id: "01a06594-c678-7000-b9b3-7bed25eebb83",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "emotional-archaeology",
  title: "Emotional Archaeology",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
