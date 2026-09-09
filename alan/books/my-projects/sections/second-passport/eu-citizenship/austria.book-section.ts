import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const austria = {
  id: "01a06594-c687-700e-b0ee-63911c0ab9f4",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "austria",
  title: "Austria",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Austrian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
