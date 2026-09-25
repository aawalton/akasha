import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyMalta = {
  id: "01a06594-c68a-7003-8366-62d93d057399",
  type: "page-type/book-section",
  slug: "eu-residency-malta",
  title: "Malta",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Malta residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/malta.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
