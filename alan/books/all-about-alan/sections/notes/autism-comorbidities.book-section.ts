import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const autismComorbidities = {
  id: "01a06594-c675-7005-8973-13173525b71d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "autism-comorbidities",
  title: "Autism comorbidities",
  sectionOf: "all-about-alan",
  description:
    "Autism comorbidities — mechanism hypothesis (regulatory-NS protein-pathway changes broaden NS-disorder risk) and Alan's triaged profile.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
