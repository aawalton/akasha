import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const erin = {
  id: "01a06594-c686-7012-a0dd-aca6ba715b8e",
  pageTypeSlug: "book-section",
  slug: "erin",
  title: "Erin",
  sectionOf: "all-about-alan",
  description:
    "Erin — Alan's chess coach on the Learn axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
