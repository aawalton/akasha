import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const selfWorthAdapter = {
  id: "01a06594-c683-7009-ac2e-3b6ebcf01ada",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-worth-adapter",
  title: "The self-worth adapter",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
