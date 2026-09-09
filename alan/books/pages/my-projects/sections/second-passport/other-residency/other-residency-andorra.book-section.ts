import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherResidencyAndorra = {
  id: "01a06594-c68b-700c-a509-4b098cfce606",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency-andorra",
  title: "Andorra",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Andorra residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
