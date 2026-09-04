import type { BookChapter } from "../../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const familyStream = {
  id: "01a06594-c68b-700f-8e82-f7182a126e4d",
  pageTypeSlug: "book-chapter",
  slug: "family-stream",
  title: "Family Stream",
  description:
    "Australia family-stream residency paths: partner (309/100, 820/801), parent (103/143/864), and other family visas with current backlogs (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
