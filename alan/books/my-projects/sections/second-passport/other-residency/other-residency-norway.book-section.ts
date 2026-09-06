import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyNorway = {
  id: "01a06594-c68c-7005-aab0-f1490036e292",
  pageTypeSlug: "book-section",
  slug: "other-residency-norway",
  title: "Norway",
  description: "Norway residency paths (May 2026 snapshot).",
  partOfSlugs: ["other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
