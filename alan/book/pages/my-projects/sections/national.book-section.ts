import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const national = {
  id: "01a06594-c68d-7015-89b5-ae0c218f5068",
  type: "page-type/book-section",
  slug: "national",
  title: "National Installers",
  sectionOf: "book-section/solar-power/installers",
  description: "National multi-state solar installers with Utah / Provo presence.",
  partOfCollections: ["book-section/solar-power/installers", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
