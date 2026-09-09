import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const croatia = {
  id: "01a06594-c687-7011-9211-ca599b6fa065",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "croatia",
  title: "Croatian Citizenship Paths",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Croatian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
