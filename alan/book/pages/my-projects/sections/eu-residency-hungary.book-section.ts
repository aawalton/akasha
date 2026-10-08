import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyHungary = {
  id: "01a06594-c689-7011-97ce-4ea5d56184fc",
  type: "page-type/book-section",
  slug: "eu-residency-hungary",
  title: "Hungary",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Hungary residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/hungary.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.105Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
