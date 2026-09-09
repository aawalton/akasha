import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const interestModulator = {
  id: "01a06594-c67a-7012-b964-8d98a1776caf",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "interest-modulator",
  title: "Interest modulator",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
