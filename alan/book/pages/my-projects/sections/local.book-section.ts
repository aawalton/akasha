import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const local = {
  id: "01a06594-c68d-7014-9386-9dc43e23e31d",
  type: "page-type/book-section",
  slug: "local",
  title: "Local Utah Installers",
  sectionOf: "book-section/solar-power/installers",
  description: "Utah-based local solar installers serving Provo / Utah County.",
  partOfCollections: ["book-section/solar-power/installers", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
