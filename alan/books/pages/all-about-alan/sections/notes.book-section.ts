import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const notes = {
  id: "01a08860-953b-7f7e-97f4-14045569719b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "notes",
  title: "Notes",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
