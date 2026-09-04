import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const sensoryExperience = {
  id: "01a06594-c683-700a-aba1-0a3e449c2d16",
  pageTypeSlug: "book-chapter",
  slug: "sensory-experience",
  title: "Sensory experience",
  description:
    "Sensory experience — sound, light, touch, taste, interoception, proprioception, sensory-seeking.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
