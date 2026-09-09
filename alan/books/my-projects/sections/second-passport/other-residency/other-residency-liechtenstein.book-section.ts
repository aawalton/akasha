import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyLiechtenstein = {
  id: "01a06594-c68c-7001-bcdf-fb35a2347ac9",
  pageTypeSlug: "book-section",
  slug: "other-residency-liechtenstein",
  title: "Liechtenstein",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Liechtenstein residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
