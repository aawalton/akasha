import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const euCitizenshipHungary = {
  id: "01a06594-c688-7007-bb9d-345f54458eeb",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-hungary",
  title: "Hungarian Citizenship Paths",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Hungarian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
