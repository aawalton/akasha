import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const conversationAsExposure = {
  id: "01a06594-c677-7005-8124-767ef60ea2cf",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "conversation-as-exposure",
  title: "Conversation as exposure",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
