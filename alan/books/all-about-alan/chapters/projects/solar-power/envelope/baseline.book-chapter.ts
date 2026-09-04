import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const baseline = {
  id: "01a06594-c68d-700d-b4f4-61dd22a4489c",
  pageTypeSlug: "book-chapter",
  slug: "baseline",
  title: "1970s Utah House — Envelope Baseline",
  description:
    "Typical envelope characteristics of a 1970s Utah house — assemblies, R-values, air leakage, ductwork — that set the starting heating load.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
