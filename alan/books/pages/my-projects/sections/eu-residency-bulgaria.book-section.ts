import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencyBulgaria = {
  id: "01a06594-c689-7008-8774-6bf2ff70b548",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-bulgaria",
  title: "Bulgaria",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Bulgaria residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/bulgaria.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
