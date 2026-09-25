import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyFrance = {
  id: "01a06594-c689-700e-bc3f-d70d7e500e71",
  type: "page-type/book-section",
  slug: "eu-residency-france",
  title: "France",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "France residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/france.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
