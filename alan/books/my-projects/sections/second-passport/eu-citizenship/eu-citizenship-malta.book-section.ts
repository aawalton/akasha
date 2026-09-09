import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipMalta = {
  id: "01a06594-c688-700d-8b7d-c6b504c5b380",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-malta",
  title: "Maltese Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Maltese citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (especially post-ECJ-ruling MEIN status).",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
