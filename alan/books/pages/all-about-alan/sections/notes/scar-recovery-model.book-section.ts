import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const scarRecoveryModel = {
  id: "01a06594-c683-7000-98b5-f79e66ce4511",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "scar-recovery-model",
  title: "The funded-passage recovery model",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
