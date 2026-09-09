import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const origin = {
  id: "01a06594-c67b-7015-b11f-0b6fe25435b7",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "origin",
  title: "Origin — the dig site",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
