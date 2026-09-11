import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const visualSensitivityBundle = {
  id: "01a06594-c686-7000-901b-c7b8423ef6b7",
  type: "book-section",
  slug: "visual-sensitivity-bundle",
  title: "Visual-sensitivity bundle",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
