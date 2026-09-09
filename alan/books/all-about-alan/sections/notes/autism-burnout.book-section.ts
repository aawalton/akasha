import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const autismBurnout = {
  id: "01a06594-c675-7004-89a8-d7de239bf423",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "autism-burnout",
  title: "Autistic burnout",
  sectionOf: "all-about-alan",
  description:
    "Autistic burnout — Alan's 18-year compound decline (sustained ~50% deficit between stressors and recovery), the catastrophic low, and the current recovery trajectory.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
