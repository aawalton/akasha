import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyAustralia = {
  id: "01a06594-c68b-7015-9670-0b91737b307b",
  type: "page-type/book-section",
  slug: "other-residency-australia",
  title: "Australia",
  sectionOf: "book-section/second-passport/other-residency",
  description:
    "Australia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/australia.md.",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.107Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
