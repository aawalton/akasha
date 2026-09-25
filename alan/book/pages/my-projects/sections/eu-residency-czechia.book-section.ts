import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyCzechia = {
  id: "01a06594-c689-700a-9aa5-66ceecb35bd6",
  type: "page-type/book-section",
  slug: "eu-residency-czechia",
  title: "Czechia",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Czechia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/czechia.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
