import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const euCitizenshipFinland = {
  id: "01a06594-c688-7003-a8e9-6614da35a78c",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-finland",
  title: "Finland",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Finnish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
