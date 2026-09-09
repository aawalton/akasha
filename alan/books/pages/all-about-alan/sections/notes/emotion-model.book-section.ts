import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const emotionModel = {
  id: "01a06594-c677-7016-96e7-89d5f3bee072",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "emotion-model",
  title: "Emotion model — sensation + narrative",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
