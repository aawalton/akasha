import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipFrance = {
  id: "01a06594-c688-7004-b9ac-37c6df63fca2",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-france",
  title: "France",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to French citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
