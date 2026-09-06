import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyCanada = {
  id: "01a06594-c68b-7016-8d73-4c9844aaaadb",
  pageTypeSlug: "book-section",
  slug: "other-residency-canada",
  title: "Canada",
  description: "Canada residency paths (May 2026 snapshot).",
  partOfSlugs: ["other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
