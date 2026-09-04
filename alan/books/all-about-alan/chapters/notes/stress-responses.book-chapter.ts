import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const stressResponses = {
  id: "01a06594-c684-7013-8dcd-56f4febef04b",
  pageTypeSlug: "book-chapter",
  slug: "stress-responses",
  title: "Stress responses",
  description:
    "Stress responses — meltdown and shutdown as symptom labels, the five sympathetic/parasympathetic modes (fight, flight, freeze, fawn, flop) as causes, and integration with the safety scale.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
