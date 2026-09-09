import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const scarRecoveryModel = {
  id: "01a06594-c683-7000-98b5-f79e66ce4511",
  pageTypeSlug: "book-section",
  slug: "scar-recovery-model",
  title: "The funded-passage recovery model",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
