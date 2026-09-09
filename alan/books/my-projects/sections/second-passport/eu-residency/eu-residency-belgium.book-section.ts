import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencyBelgium = {
  id: "01a06594-c689-7007-b0fa-b553fb718760",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-belgium",
  title: "Belgium",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Belgium residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/belgium.md.",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
