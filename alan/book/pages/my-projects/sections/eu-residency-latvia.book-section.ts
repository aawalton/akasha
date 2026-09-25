import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyLatvia = {
  id: "01a06594-c68a-7000-850d-54662590e04a",
  type: "page-type/book-section",
  slug: "eu-residency-latvia",
  title: "Latvia",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Latvia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/latvia.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
