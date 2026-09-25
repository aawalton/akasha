import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyPortugal = {
  id: "01a06594-c68a-7006-90ac-8fce484a6baf",
  type: "page-type/book-section",
  slug: "eu-residency-portugal",
  title: "Portugal",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Portugal residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/portugal.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
