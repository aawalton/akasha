import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const ione = {
  id: "01a06594-c687-7000-952d-aed81c968e3e",
  pageTypeSlug: "book-section",
  slug: "ione",
  title: "Ione",
  sectionOf: "all-about-alan",
  description:
    "Ione — Alan's sleep companion on the Health axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
