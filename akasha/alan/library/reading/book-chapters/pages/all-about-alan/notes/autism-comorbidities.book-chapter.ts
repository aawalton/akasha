import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const autismComorbidities = {
  id: "01a06594-c675-7005-8973-13173525b71d",
  pageTypeSlug: "book-chapter",
  slug: "autism-comorbidities",
  title: "Autism comorbidities",
  description:
    "Autism comorbidities — mechanism hypothesis (regulatory-NS protein-pathway changes broaden NS-disorder risk) and Alan's triaged profile.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
