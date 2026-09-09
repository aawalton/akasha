import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipItaly = {
  id: "01a06594-c688-7009-b051-acc260da6b10",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-italy",
  title: "Italy",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Italian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (esp. post-Tajani-decree jure sanguinis state).",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
