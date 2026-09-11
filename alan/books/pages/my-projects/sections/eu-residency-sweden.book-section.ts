import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const euResidencySweden = {
  id: "01a06594-c68a-700c-a1c4-94572ff6c59e",
  type: "book-section",
  slug: "eu-residency-sweden",
  title: "Sweden",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Sweden residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/sweden.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
