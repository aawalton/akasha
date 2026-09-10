import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const euCitizenshipPoland = {
  id: "01a06594-c688-700f-a757-fb83a8414c3a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship-poland",
  title: "Polish Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Polish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (tolerated), and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
