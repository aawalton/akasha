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
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
