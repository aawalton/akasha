import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherCitizenshipUruguay = {
  id: "01a06594-c68b-700b-b32a-63430ebcc149",
  type: "page-type/book-section",
  slug: "other-citizenship-uruguay",
  title: "Uruguay",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Uruguay citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
