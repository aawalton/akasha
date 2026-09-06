import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipCanada = {
  id: "01a06594-c68a-700f-9110-da9782de1cce",
  pageTypeSlug: "book-section",
  slug: "other-citizenship-canada",
  title: "Canada",
  description: "Canada citizenship paths (May 2026 snapshot).",
  partOfSlugs: ["other-citizenship"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
