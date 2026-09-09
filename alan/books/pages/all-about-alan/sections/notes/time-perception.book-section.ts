import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const timePerception = {
  id: "01a06594-c685-7007-bd80-3b671b79814a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "time-perception",
  title: "Time perception",
  sectionOf: "all-about-alan",
  description:
    "Time perception — Alan's experience of time, mechanism hypotheses tracing it to aphantasia, and the lived consequence of felt agelessness.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
