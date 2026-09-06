import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const passiveIncome = {
  id: "01a06594-c68c-700c-a4ca-f059f98020e1",
  pageTypeSlug: "book-section",
  slug: "passive-income",
  title: "Passive Income",
  partOfSlugs: ["second-passport"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
