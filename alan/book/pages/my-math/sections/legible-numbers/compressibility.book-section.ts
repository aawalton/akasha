import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const compressibility = {
  id: "01a06594-c68e-7010-932a-218a1408df7d",
  type: "page-type/book-section",
  slug: "compressibility",
  title: "Compressibility is intrinsic",
  sectionOf: "alan-book/my-math",
  partOfCollections: ["alan-book/my-math", "book-section/my-math/legible-numbers"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.110Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
