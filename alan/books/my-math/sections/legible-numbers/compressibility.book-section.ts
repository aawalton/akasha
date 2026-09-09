import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const compressibility = {
  id: "01a06594-c68e-7010-932a-218a1408df7d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "compressibility",
  title: "Compressibility is intrinsic",
  sectionOf: "my-math",
  partOfCollections: ["my-math"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
