import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const triggerBasedMemory = {
  id: "01a06594-c685-700a-98a5-13eb6b786d38",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "trigger-based-memory",
  title: "Trigger-based memory",
  sectionOf: "all-about-alan",
  description:
    "Trigger-based memory — Alan's primary memory architecture. The same cue→concept retrieval mechanism runs across text memorization, talks, and the agent harness.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
