import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const observations = {
  id: "01a06594-c68d-7016-994c-245e2f4b9498",
  pageTypeSlug: "book-section",
  slug: "observations",
  title: "Summary Observations",
  sectionOf: "book-section/solar-power/installers",
  description: "Summary observations on Provo / Utah solar installer landscape.",
  partOfCollections: ["book-section/solar-power/installers"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
