import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const stamina = {
  id: "01a06594-c684-700a-8531-35abbc51d67a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "stamina",
  title: "Stamina",
  sectionOf: "all-about-alan",
  description:
    "Stamina — physical energy. Levels of energy resources in the body. Currently at stoplight resolution; reads through signed valence on movement.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
