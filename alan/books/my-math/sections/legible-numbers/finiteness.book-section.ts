import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const finiteness = {
  id: "01a06594-c68e-7011-93aa-6503b1220d97",
  pageTypeSlug: "book-section",
  slug: "finiteness",
  title: "The legible set is finite, and almost every real is illegible",
  sectionOf: "my-math",
  partOfCollections: ["my-math"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
