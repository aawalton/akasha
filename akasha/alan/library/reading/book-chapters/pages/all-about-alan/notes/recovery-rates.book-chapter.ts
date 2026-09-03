import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const recoveryRates = {
  id: "01a06594-c67c-700d-b45c-73bcd8c73a88",
  pageTypeSlug: "book-chapter",
  slug: "recovery-rates",
  title: "Recovery rates",
  description:
    "Stress-capacity recovery rates — deep meditative breathing, rest, sleep, hot baths, the Nuropod.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
