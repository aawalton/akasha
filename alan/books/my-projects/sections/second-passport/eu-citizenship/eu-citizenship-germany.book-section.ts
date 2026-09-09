import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipGermany = {
  id: "01a06594-c688-7005-a595-4872ae8b6994",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-germany",
  title: "Germany",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to German citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (post-2024 reform), and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
