import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const dynamicFeedback = {
  id: "01a06594-c677-7014-8512-2f4fa4582cb3",
  type: "book-section",
  slug: "dynamic-feedback",
  title: "Dynamic feedback loop",
  sectionOf: "all-about-alan",
  description: "Dynamic feedback loop between stress-capacity surplus and safety level.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
