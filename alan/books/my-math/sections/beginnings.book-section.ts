import type { BookSection } from "../../../library/reading/book-chapters/book-section.page-type.ts"

export const beginnings = {
  id: "01a06594-c68e-700e-9219-31c312a83692",
  pageTypeSlug: "book-section",
  slug: "beginnings",
  title: "My Math",
  sectionOf: "my-math",
  position: 0,
  partOfCollections: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
