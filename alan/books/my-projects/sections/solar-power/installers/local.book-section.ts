import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const local = {
  id: "01a06594-c68d-7014-9386-9dc43e23e31d",
  pageTypeSlug: "book-section",
  slug: "local",
  title: "Local Utah Installers",
  sectionOfSlug: "book-section/solar-power/installers",
  description: "Utah-based local solar installers serving Provo / Utah County.",
  partOfSlugs: ["book-section/solar-power/installers"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
