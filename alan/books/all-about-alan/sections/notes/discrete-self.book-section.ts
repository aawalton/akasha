import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const discreteSelf = {
  id: "01a06594-c677-700f-a810-305f138cd48c",
  pageTypeSlug: "book-section",
  slug: "discrete-self",
  title: "The discrete self",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
