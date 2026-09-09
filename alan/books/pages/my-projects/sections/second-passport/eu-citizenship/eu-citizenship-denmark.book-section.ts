import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euCitizenshipDenmark = {
  id: "01a06594-c688-7001-89b2-d97ba79f1ad9",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-denmark",
  title: "Denmark",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Danish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
