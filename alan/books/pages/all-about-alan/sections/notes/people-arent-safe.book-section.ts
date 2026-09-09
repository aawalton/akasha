import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const peopleArentSafe = {
  id: "01a06594-c67b-7013-85a8-64d937d3d8f7",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "people-arent-safe",
  title: "People aren't safe",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
