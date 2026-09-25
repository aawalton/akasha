import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euCitizenshipSummary = {
  id: "01a06594-c689-7005-b903-464c26182985",
  type: "page-type/book-section",
  slug: "eu-citizenship-summary",
  title: "Summary",
  sectionOf: "book-section/second-passport/eu-citizenship",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
