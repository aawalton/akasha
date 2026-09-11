import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const captureEvents = {
  id: "01a06594-c675-7017-9548-1bb0feb01ce6",
  type: "book-section",
  slug: "capture-events",
  title: "Capture events",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
