import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const battery = {
  id: "01a06594-c68e-7006-942e-d347a34aa85e",
  pageTypeSlug: "book-chapter",
  slug: "battery",
  title: "Battery Sizing",
  description:
    "Battery sizing — daily PV-to-evening shifting plus short-duration outage resilience. Seasonal storage role is held by the grid; battery is not a seasonal asset.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
