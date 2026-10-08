import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherCitizenshipUk = {
  id: "01a06594-c68b-700a-bead-e7a607bce2c3",
  type: "page-type/book-section",
  slug: "other-citizenship-uk",
  title: "United Kingdom — Paths to Citizenship (May 2026)",
  sectionOf: "book-section/second-passport/other-citizenship",
  description:
    "UK citizenship paths (May 2026 snapshot). For residency paths, see ../residency/uk.md.",
  partOfCollections: ["book-section/second-passport/other-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.107Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
