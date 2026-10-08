import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherCitizenshipAndorra = {
  id: "01a06594-c68a-700d-a6e8-2d55edf2043f",
  type: "page-type/book-section",
  slug: "other-citizenship-andorra",
  title: "Andorra",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Andorra citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.106Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
