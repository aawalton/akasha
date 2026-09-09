import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const sensoryExperience = {
  id: "01a06594-c683-700a-aba1-0a3e449c2d16",
  pageTypeSlug: "book-section",
  slug: "sensory-experience",
  title: "Sensory experience",
  sectionOf: "all-about-alan",
  description:
    "Sensory experience — sound, light, touch, taste, interoception, proprioception, sensory-seeking.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
