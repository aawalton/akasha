import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const sources = {
  id: "01a08861-8fad-7611-ab85-593238d19e93",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "sources",
  title: "Sources",
  sectionOf: "my-faith",
  partOfCollections: ["my-faith"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
