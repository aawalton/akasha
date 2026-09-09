import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const decisionRubric = {
  id: "01a06594-c677-700d-a581-5b89bdc902ac",
  pageTypeSlug: "book-section",
  slug: "decision-rubric",
  title: "Decision rubric",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
