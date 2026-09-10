import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const euCitizenshipBelgium = {
  id: "01a06594-c687-700f-b388-76ec798249b5",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-belgium",
  title: "Belgian Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Belgian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
