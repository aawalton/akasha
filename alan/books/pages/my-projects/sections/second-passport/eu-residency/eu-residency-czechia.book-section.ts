import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencyCzechia = {
  id: "01a06594-c689-700a-9aa5-66ceecb35bd6",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-czechia",
  title: "Czechia",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Czechia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/czechia.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
