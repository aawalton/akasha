import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const selfChosenDifficulty = {
  id: "01a06594-c683-7003-8b32-ac82f661a103",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-chosen-difficulty",
  title: "Self-chosen difficulty",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
