import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euCitizenshipEstonia = {
  id: "01a06594-c688-7002-b5ce-a8fbcf1d8c53",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-estonia",
  title: "Estonian Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Estonian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (with the birthright-by-blood nuance), and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
