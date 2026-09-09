import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipLithuania = {
  id: "01a06594-c688-700b-840d-c66b55a5b616",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-lithuania",
  title: "Lithuanian Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Lithuanian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (constitutionally restricted), and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
