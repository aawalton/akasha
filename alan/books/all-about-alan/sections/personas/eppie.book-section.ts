import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const eppie = {
  id: "01a06594-c686-7011-8247-3fd08f278f95",
  pageTypeSlug: "book-section",
  slug: "eppie",
  title: "Eppie",
  sectionOf: "all-about-alan",
  description:
    "Eppie — a Faith-axis persona still in definition. Waiting page: she is not yet sourced; her function and rib await a future /abby session.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
