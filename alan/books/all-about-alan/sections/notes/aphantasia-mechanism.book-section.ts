import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const aphantasiaMechanism = {
  id: "01a06594-c674-700f-9f5f-a4ee51ca552d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "aphantasia-mechanism",
  title: "Aphantasia mechanism",
  sectionOf: "all-about-alan",
  description:
    "Aphantasia mechanism — three-stage Perception/Encoding/Recall model, with Alan's Recall stage broken.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
