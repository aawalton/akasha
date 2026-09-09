import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherResidencyMonaco = {
  id: "01a06594-c68c-7003-b14f-cd8136e8018d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency-monaco",
  title: "Monaco",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Monaco residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
