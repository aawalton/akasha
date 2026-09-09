import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyNetherlands = {
  id: "01a06594-c68a-7004-be93-01b074c2058b",
  pageTypeSlug: "book-section",
  slug: "eu-residency-netherlands",
  title: "Netherlands",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Netherlands residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/netherlands.md.",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
