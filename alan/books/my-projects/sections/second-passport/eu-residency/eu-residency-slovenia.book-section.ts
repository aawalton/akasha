import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencySlovenia = {
  id: "01a06594-c68a-7009-89dd-02201f4e0939",
  pageTypeSlug: "book-section",
  slug: "eu-residency-slovenia",
  title: "Slovenia",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Slovenia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/slovenia.md.",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
