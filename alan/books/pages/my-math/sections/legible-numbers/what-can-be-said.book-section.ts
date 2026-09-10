import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const whatCanBeSaid = {
  id: "01a06594-c68e-7017-9a4c-626e6985ba96",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "what-can-be-said",
  title: "What can be said about an illegible number",
  sectionOf: "my-math",
  partOfCollections: ["my-math", "book-section/my-math/legible-numbers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
