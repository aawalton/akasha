import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencySlovakia = {
  id: "01a06594-c68a-7008-8f4b-9203facc30fd",
  type: "page-type/book-section",
  slug: "eu-residency-slovakia",
  title: "Slovakia",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Slovakia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/slovakia.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
