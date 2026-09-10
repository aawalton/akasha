import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const specialCategory = {
  id: "01a06594-c68b-7012-a169-8a5c0f88db74",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "special-category",
  title: "Special Category",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia special-category residency: the New Zealand-citizen Special Category Visa 444 and its 2023 direct-citizenship path (May 2026 snapshot).",
  partOfCollections: ["book-section/other-residency/other-residency-australia", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
