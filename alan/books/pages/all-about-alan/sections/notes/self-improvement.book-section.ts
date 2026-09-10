import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const selfImprovement = {
  id: "01a06594-c683-7004-b86d-70cceab3cb2a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-improvement",
  title: "Self-improvement — the atom",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
