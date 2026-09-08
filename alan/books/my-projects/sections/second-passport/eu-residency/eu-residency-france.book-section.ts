import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyFrance = {
  id: "01a06594-c689-700e-bc3f-d70d7e500e71",
  pageTypeSlug: "book-section",
  slug: "eu-residency-france",
  title: "France",
  sectionOfSlug: "book-section/second-passport/eu-residency",
  description:
    "France residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/france.md.",
  partOfCollectionSlugs: ["book-section/second-passport/eu-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
