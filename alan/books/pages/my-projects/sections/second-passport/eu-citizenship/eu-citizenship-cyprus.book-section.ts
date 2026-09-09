import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euCitizenshipCyprus = {
  id: "01a06594-c687-7012-ba21-6e45e0143ad9",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-cyprus",
  title: "Cypriot Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Cypriot citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
