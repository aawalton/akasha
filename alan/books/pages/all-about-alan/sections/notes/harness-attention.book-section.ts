import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const harnessAttention = {
  id: "01a06594-c67a-7003-9cf5-4412f5923d6e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "harness-attention",
  title: "Harness attention",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
