import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const compressibility = {
  id: "01a06594-c68e-7010-932a-218a1408df7d",
  type: "book-section",
  slug: "compressibility",
  title: "Compressibility is intrinsic",
  sectionOf: "my-math",
  partOfCollections: ["my-math", "book-section/my-math/legible-numbers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
