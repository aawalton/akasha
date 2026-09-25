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
} as const satisfies BookSection
