import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euCitizenshipLuxembourg = {
  id: "01a06594-c688-700c-bc0c-08dde15112df",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-luxembourg",
  title: "Luxembourgish Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Luxembourgish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (allowed since 2009), and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
