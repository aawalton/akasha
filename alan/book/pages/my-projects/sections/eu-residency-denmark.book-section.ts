import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyDenmark = {
  id: "01a06594-c689-700b-be14-d378fa7915ca",
  type: "page-type/book-section",
  slug: "eu-residency-denmark",
  title: "Denmark",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Denmark residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/denmark.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
