import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const connectionDebt = {
  id: "01a06594-c677-7000-86cf-dc3e180ece2a",
  pageTypeSlug: "book-section",
  slug: "connection-debt",
  title: "Connection debt",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
