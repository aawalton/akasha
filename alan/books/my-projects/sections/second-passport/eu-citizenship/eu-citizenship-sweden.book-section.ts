import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipSweden = {
  id: "01a06594-c689-7006-b4f7-ad60db8ec6de",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-sweden",
  title: "Sweden",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Swedish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (post-Kristersson-tightenings).",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
