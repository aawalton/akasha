import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const noDeliberateMode = {
  id: "01a06594-c67b-700e-b8a4-095d30cedb17",
  pageTypeSlug: "book-section",
  slug: "no-deliberate-mode",
  title: "No deliberate mode",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
