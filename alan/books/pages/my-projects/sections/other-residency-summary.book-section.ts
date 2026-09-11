import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const otherResidencySummary = {
  id: "01a06594-c68c-7008-b174-35243ceec850",
  type: "book-section",
  slug: "other-residency-summary",
  title: "Summary",
  sectionOf: "book-section/second-passport/other-residency",
  partOfCollections: ["book-section/second-passport/other-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
