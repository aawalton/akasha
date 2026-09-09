import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const importanceOverUrgency = {
  id: "01a06594-c67a-700d-8b89-8604d382fa9e",
  pageTypeSlug: "book-section",
  slug: "importance-over-urgency",
  title: "Importance over urgency",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
