import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyHungary = {
  id: "01a06594-c689-7011-97ce-4ea5d56184fc",
  pageTypeSlug: "book-section",
  slug: "eu-residency-hungary",
  title: "Hungary",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Hungary residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/hungary.md.",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
