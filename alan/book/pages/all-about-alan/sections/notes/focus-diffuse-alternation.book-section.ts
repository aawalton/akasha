import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const focusDiffuseAlternation = {
  id: "01a06594-c679-700f-9a74-3acbf40957a9",
  type: "page-type/book-section",
  slug: "focus-diffuse-alternation",
  title: "Focus/diffuse alternation",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
