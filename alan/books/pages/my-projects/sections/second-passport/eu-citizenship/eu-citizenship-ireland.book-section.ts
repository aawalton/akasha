import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euCitizenshipIreland = {
  id: "01a06594-c688-7008-8f40-d97ab048fdbc",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-ireland",
  title: "Ireland — Paths to Citizenship (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Irish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
