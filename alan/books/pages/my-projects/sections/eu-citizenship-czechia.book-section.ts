import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const euCitizenshipCzechia = {
  id: "01a06594-c688-7000-90d1-0b142df1ddaa",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-czechia",
  title: "Czech Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Czech citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
