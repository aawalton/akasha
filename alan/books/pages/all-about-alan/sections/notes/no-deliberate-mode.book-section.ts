import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const noDeliberateMode = {
  id: "01a06594-c67b-700e-b8a4-095d30cedb17",
  type: "book-section",
  slug: "no-deliberate-mode",
  title: "No deliberate mode",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
