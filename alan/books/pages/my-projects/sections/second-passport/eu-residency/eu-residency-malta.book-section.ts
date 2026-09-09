import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencyMalta = {
  id: "01a06594-c68a-7003-8366-62d93d057399",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-malta",
  title: "Malta",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Malta residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/malta.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
