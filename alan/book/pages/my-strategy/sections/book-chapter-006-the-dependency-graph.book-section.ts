import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bookChapter006TheDependencyGraph = {
  id: "01a06594-c68f-7006-aec2-1519277b41ee",
  type: "page-type/book-section",
  slug: "book-chapter-006-the-dependency-graph",
  title: "The dependency graph",
  sectionOf: "alan-book/my-strategy",
  position: 6,
  partOfCollections: ["alan-book/my-strategy"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
