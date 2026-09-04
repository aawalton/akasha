import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const degradationSystem = {
  id: "01a06594-c68c-700e-9b18-24b710ce2d62",
  pageTypeSlug: "book-chapter",
  slug: "degradation-system",
  title: "Degradation, ILR, Albedo, Structural, UV",
  description:
    "Module degradation, DC/AC ratio & clipping, albedo, snow load structural, and high-altitude UV. The factors that act over years or at the system-design level.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
