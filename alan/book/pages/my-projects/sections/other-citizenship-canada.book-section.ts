import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherCitizenshipCanada = {
  id: "01a06594-c68a-700f-9110-da9782de1cce",
  type: "page-type/book-section",
  slug: "other-citizenship-canada",
  title: "Canada",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Canada citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
