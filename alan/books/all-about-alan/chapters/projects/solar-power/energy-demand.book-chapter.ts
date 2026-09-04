import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const energyDemand = {
  id: "01a06594-c68d-700b-856e-4bd453f6fd44",
  pageTypeSlug: "book-chapter",
  slug: "energy-demand",
  title: "Annual Energy Demand (1350 Apple Ave, Provo, UT)",
  description:
    "Annual energy demand plan for all-electric 6000 sq ft Provo home with heat pumps, 12 gaming PCs, two EVs — sized for self-sufficiency.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
