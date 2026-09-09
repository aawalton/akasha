import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const agentHarness = {
  id: "01a06594-c674-7008-839c-893beadb8b48",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "agent-harness",
  title: "Agent harness",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
