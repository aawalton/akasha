import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const regional = {
  id: "01a06594-c68d-7017-8b1c-cb1325796bdc",
  type: "page-type/book-section",
  slug: "regional",
  title: "Regional Installers",
  sectionOf: "book-section/solar-power/installers",
  description: "Regional / multi-state solar installers serving Provo, UT.",
  partOfCollections: ["book-section/solar-power/installers", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
