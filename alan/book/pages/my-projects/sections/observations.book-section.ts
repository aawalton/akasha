import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const observations = {
  id: "01a06594-c68d-7016-994c-245e2f4b9498",
  type: "page-type/book-section",
  slug: "observations",
  title: "Summary Observations",
  sectionOf: "book-section/solar-power/installers",
  description: "Summary observations on Provo / Utah solar installer landscape.",
  partOfCollections: ["book-section/solar-power/installers", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
