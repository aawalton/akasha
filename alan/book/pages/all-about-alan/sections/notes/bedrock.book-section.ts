import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const bedrock = {
  id: "01a06594-c675-7011-96ce-8b7616386a56",
  type: "page-type/book-section",
  slug: "bedrock",
  title: "The bedrock — Freedom and Self-Improvement, one welded root",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
