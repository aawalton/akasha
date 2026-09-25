import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const defunct = {
  id: "01a06594-c68d-7013-8f76-e8e1a587791a",
  type: "page-type/book-section",
  slug: "defunct",
  title: "Defunct / Red-Flag Operators",
  sectionOf: "book-section/solar-power/installers",
  description: "Defunct, exited, or red-flagged solar installers — do not contract.",
  partOfCollections: ["book-section/solar-power/installers", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
