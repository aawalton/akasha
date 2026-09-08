import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyCanada = {
  id: "01a06594-c68b-7016-8d73-4c9844aaaadb",
  pageTypeSlug: "book-section",
  slug: "other-residency-canada",
  title: "Canada",
  sectionOfSlug: "book-section/second-passport/other-residency",
  description: "Canada residency paths (May 2026 snapshot).",
  partOfCollectionSlugs: ["book-section/second-passport/other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
