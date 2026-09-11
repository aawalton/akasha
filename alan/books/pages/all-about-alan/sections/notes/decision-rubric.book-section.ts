import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const decisionRubric = {
  id: "01a06594-c677-700d-a581-5b89bdc902ac",
  type: "book-section",
  slug: "decision-rubric",
  title: "Decision rubric",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
