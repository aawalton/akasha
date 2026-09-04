import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const employmentCessation = {
  id: "01a06594-c678-7002-8fe4-14db949ab0df",
  pageTypeSlug: "book-chapter",
  slug: "employment-cessation",
  title: "Employment cessation",
  description:
    "Employment cessation as a system — the 80% cost cut, the cost-vs-capacity ratchet that forced it, and the financial bridge that made the cut implementable.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
