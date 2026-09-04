import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const reducedChaining = {
  id: "01a06594-c67c-700e-afbe-26a8ba4a8ba3",
  pageTypeSlug: "book-chapter",
  slug: "reduced-chaining",
  title: "Reduced chaining (disadvantage)",
  description:
    "Reduced chaining — disadvantage of aphantasia where only conceptual triggers fire, with no sensory or emotional ones.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
