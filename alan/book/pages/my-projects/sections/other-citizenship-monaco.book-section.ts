import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherCitizenshipMonaco = {
  id: "01a06594-c68b-7003-a540-01601bea5c73",
  type: "page-type/book-section",
  slug: "other-citizenship-monaco",
  title: "Monaco",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Monaco citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.107Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
