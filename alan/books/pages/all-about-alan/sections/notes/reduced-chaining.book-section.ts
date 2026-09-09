import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const reducedChaining = {
  id: "01a06594-c67c-700e-afbe-26a8ba4a8ba3",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "reduced-chaining",
  title: "Reduced chaining (disadvantage)",
  sectionOf: "all-about-alan",
  description:
    "Reduced chaining — disadvantage of aphantasia where only conceptual triggers fire, with no sensory or emotional ones.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
