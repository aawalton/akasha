import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const euCitizenshipRomania = {
  id: "01a06594-c689-7001-8eeb-5bd754d1f064",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-romania",
  title: "Romanian Citizenship Paths",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Romanian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (esp. Article 11 reacquisition).",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
