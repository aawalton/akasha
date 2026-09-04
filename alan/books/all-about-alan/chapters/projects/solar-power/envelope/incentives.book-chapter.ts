import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const incentives = {
  id: "01a06594-c68d-700e-8510-f9f4dc8ee80a",
  pageTypeSlug: "book-chapter",
  slug: "incentives",
  title: "Incentives and Utah Contractors",
  description:
    "Current envelope-retrofit incentives in Utah (May 2026) — federal 25C dead, Utah HOMES/HEAR pending, Rocky Mountain Power Wattsmart live — plus local contractor leads.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
