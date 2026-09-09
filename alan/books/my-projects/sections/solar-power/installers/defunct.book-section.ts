import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const defunct = {
  id: "01a06594-c68d-7013-8f76-e8e1a587791a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "defunct",
  title: "Defunct / Red-Flag Operators",
  sectionOf: "book-section/solar-power/installers",
  description: "Defunct, exited, or red-flagged solar installers — do not contract.",
  partOfCollections: ["book-section/solar-power/installers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
