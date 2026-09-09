import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const mana = {
  id: "01a06594-c67b-7002-9345-ef7938e65981",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "mana",
  title: "Mana",
  sectionOf: "all-about-alan",
  description:
    "Mana — executive function. Levels of neurotransmitters and energy resources in the brain. Currently at stoplight resolution; reads through wantingness magnitude.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
