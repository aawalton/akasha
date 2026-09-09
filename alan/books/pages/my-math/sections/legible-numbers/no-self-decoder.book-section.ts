import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const noSelfDecoder = {
  id: "01a06594-c68e-7012-a1fe-2268bcd4491b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "no-self-decoder",
  title: "No universe decodes itself",
  sectionOf: "my-math",
  partOfCollections: ["my-math", "book-section/my-math/book-chapter-001-legible-numbers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
