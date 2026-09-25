import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencySweden = {
  id: "01a06594-c68a-700c-a1c4-94572ff6c59e",
  type: "page-type/book-section",
  slug: "eu-residency-sweden",
  title: "Sweden",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Sweden residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/sweden.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
