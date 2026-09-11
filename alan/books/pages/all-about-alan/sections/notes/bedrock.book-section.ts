import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const bedrock = {
  id: "01a06594-c675-7011-96ce-8b7616386a56",
  type: "book-section",
  slug: "bedrock",
  title: "The bedrock — Freedom and Self-Improvement, one welded root",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
