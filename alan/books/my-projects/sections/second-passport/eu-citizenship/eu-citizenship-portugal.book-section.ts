import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipPortugal = {
  id: "01a06594-c689-7000-9317-71323ba3e69c",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-portugal",
  title: "Portuguese Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Portuguese citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (post-Sephardic-closure, post-2025-reform).",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
