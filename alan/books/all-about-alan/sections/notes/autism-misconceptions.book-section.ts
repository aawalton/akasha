import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const autismMisconceptions = {
  id: "01a06594-c675-7007-af4b-78f71ea519f5",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "autism-misconceptions",
  title: "What common autism descriptions get wrong about Alan",
  sectionOf: "all-about-alan",
  description:
    "What common autism descriptions get wrong about Alan — empathy, bluntness, routines, transitions, theory of mind, functioning labels.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
