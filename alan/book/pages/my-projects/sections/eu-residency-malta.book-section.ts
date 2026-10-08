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
  createdAt: "2026-09-03T04:44:04.106Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
