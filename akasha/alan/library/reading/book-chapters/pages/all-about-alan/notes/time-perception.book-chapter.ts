import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const timePerception = {
  id: "01a06594-c685-7007-bd80-3b671b79814a",
  pageTypeSlug: "book-chapter",
  slug: "time-perception",
  title: "Time perception",
  description:
    "Time perception — Alan's experience of time, mechanism hypotheses tracing it to aphantasia, and the lived consequence of felt agelessness.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
