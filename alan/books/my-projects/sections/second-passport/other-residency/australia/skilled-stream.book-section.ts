import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const skilledStream = {
  id: "01a06594-c68b-7011-8f9a-45826f73bd04",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "skilled-stream",
  title: "Skilled Stream",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia skilled-migration residency paths: points-tested 189/190/491, employer-sponsored 482 (SID)/186/494, and the National Innovation Visa 858 (May 2026 snapshot).",
  partOfCollections: ["book-section/other-residency/other-residency-australia"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
