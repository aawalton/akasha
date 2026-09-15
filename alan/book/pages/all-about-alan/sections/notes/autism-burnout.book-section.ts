import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const autismBurnout = {
  id: "01a06594-c675-7004-89a8-d7de239bf423",
  type: "book-section",
  slug: "autism-burnout",
  title: "Autistic burnout",
  sectionOf: "alan-book/all-about-alan",
  description:
    "Autistic burnout — Alan's 18-year compound decline (sustained ~50% deficit between stressors and recovery), the catastrophic low, and the current recovery trajectory.",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
