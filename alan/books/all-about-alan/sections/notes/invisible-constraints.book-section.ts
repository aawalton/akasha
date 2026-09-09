import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const invisibleConstraints = {
  id: "01a06594-c67a-7014-a655-2e082a534002",
  pageTypeSlug: "book-section",
  slug: "invisible-constraints",
  title: "Invisible constraints",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
