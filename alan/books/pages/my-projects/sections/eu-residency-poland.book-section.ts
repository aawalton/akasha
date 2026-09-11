import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const euResidencyPoland = {
  id: "01a06594-c68a-7005-acde-911880f01e83",
  type: "book-section",
  slug: "eu-residency-poland",
  title: "Poland",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Poland residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/poland.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
