import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const nonDiscretionaryReclassification = {
  id: "01a06594-c67b-700f-b148-53cff72cd9e1",
  pageTypeSlug: "book-chapter",
  slug: "non-discretionary-reclassification",
  title: "Non-discretionary reclassification",
  description:
    'Non-discretionary reclassification — the framing layer above the cost-vs-capacity calculation. Items mentally classified "must-do" never reach the math; reclassifying them is the first move.',
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
