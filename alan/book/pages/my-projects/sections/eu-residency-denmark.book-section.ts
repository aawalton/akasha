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
  createdAt: "2026-09-03T04:44:04.105Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
