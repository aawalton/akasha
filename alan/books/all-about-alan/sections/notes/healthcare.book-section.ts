import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const healthcare = {
  id: "01a06594-c67a-7005-b160-6719bf3b4a78",
  pageTypeSlug: "book-section",
  slug: "healthcare",
  title: "Healthcare",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
