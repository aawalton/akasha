import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyLuxembourg = {
  id: "01a06594-c68a-7002-b322-f91c8c2d18be",
  type: "page-type/book-section",
  slug: "eu-residency-luxembourg",
  title: "Luxembourg",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Luxembourg residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/luxembourg.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.106Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
