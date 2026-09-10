import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const connectionDosing = {
  id: "01a06594-c677-7001-a477-0df83b58f97e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "connection-dosing",
  title: "Connection dosing",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
