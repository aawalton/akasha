import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const selfWorthAdapter = {
  id: "01a06594-c683-7009-ac2e-3b6ebcf01ada",
  type: "book-section",
  slug: "self-worth-adapter",
  title: "The self-worth adapter",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
