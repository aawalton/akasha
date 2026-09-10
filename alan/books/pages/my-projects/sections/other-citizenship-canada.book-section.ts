import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const otherCitizenshipCanada = {
  id: "01a06594-c68a-700f-9110-da9782de1cce",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-canada",
  title: "Canada",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Canada citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
