import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const fourResourceModel = {
  id: "01a06594-c679-7012-b334-499424114e96",
  pageTypeSlug: "book-chapter",
  slug: "four-resource-model",
  title: "Four-resource model",
  description:
    "Four-resource model — overview. Health (stress capacity), Mana (executive function), Stamina (physical energy), Safety (vagal tone). Each resource has its own doc; this file is the hub.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
