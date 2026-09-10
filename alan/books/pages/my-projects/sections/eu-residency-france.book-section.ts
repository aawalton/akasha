import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const euResidencyFrance = {
  id: "01a06594-c689-700e-bc3f-d70d7e500e71",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-france",
  title: "France",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "France residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/france.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
