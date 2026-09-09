import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const scope = {
  id: "01a06594-c68e-7005-b271-555e516e4d60",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "scope",
  title: "Scope",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Scope and architectural decisions for the solar power project — site inputs, loads in/out of scope, and the constraints that shape sizing.",
  partOfCollections: ["book-section/my-projects/solar-power", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
