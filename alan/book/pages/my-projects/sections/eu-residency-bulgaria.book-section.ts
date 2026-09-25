import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyBulgaria = {
  id: "01a06594-c689-7008-8774-6bf2ff70b548",
  type: "page-type/book-section",
  slug: "eu-residency-bulgaria",
  title: "Bulgaria",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Bulgaria residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/bulgaria.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
