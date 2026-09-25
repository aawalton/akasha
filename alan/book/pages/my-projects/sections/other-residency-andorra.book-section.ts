import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyAndorra = {
  id: "01a06594-c68b-700c-a509-4b098cfce606",
  type: "page-type/book-section",
  slug: "other-residency-andorra",
  title: "Andorra",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Andorra residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
