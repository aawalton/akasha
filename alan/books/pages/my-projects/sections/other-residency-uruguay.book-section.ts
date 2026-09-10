import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const otherResidencyUruguay = {
  id: "01a06594-c68c-700b-ad3d-6917aa4703e7",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency-uruguay",
  title: "Uruguay",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Uruguay residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
