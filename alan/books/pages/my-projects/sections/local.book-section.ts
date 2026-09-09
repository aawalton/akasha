import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const local = {
  id: "01a06594-c68d-7014-9386-9dc43e23e31d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "local",
  title: "Local Utah Installers",
  sectionOf: "book-section/solar-power/installers",
  description: "Utah-based local solar installers serving Provo / Utah County.",
  partOfCollections: ["book-section/solar-power/installers", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
