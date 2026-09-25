import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherCitizenshipJapan = {
  id: "01a06594-c68b-7000-831e-c059ccfbad1e",
  type: "page-type/book-section",
  slug: "other-citizenship-japan",
  title: "Japan",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Japan citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
