import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipGreece = {
  id: "01a06594-c688-7006-9a5a-e472102db961",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-greece",
  title: "Greek Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Greek citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
