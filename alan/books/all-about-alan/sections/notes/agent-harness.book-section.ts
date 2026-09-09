import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const agentHarness = {
  id: "01a06594-c674-7008-839c-893beadb8b48",
  pageTypeSlug: "book-section",
  slug: "agent-harness",
  title: "Agent harness",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
