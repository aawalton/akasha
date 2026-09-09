import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const connectionDosing = {
  id: "01a06594-c677-7001-a477-0df83b58f97e",
  pageTypeSlug: "book-section",
  slug: "connection-dosing",
  title: "Connection dosing",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
