import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const recoveryLadder = {
  id: "01a06594-c67c-700c-ae61-931e270f5e3d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "recovery-ladder",
  title: "The recovery ladder",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
