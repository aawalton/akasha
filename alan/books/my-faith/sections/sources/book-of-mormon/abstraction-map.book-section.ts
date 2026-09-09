import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const abstractionMap = {
  id: "01a06594-c68e-700d-b690-848031a7a0ed",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "abstraction-map",
  title: "Domain abstraction map — The Book of Mormon (Layer 1)",
  sectionOf: "my-faith",
  partOfCollections: ["my-faith"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
