import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyUruguay = {
  id: "01a06594-c68c-700b-ad3d-6917aa4703e7",
  type: "page-type/book-section",
  slug: "other-residency-uruguay",
  title: "Uruguay",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Uruguay residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
