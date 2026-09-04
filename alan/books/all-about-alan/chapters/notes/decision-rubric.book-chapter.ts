import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const decisionRubric = {
  id: "01a06594-c677-700d-a581-5b89bdc902ac",
  pageTypeSlug: "book-chapter",
  slug: "decision-rubric",
  title: "Decision rubric",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
