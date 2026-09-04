import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const assessment = {
  id: "01a06594-c68d-700c-9ddb-6b1adb48d132",
  pageTypeSlug: "book-chapter",
  slug: "assessment",
  title: "Envelope Assessment Options",
  description:
    "Assessment options for the envelope — blower door, IR thermography, Manual J, BPI / RESNET audits — with current pricing and what each one resolves.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
