import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const perceivedCertainty = {
  id: "01a06594-c67b-7014-a6b9-ba7717089902",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "perceived-certainty",
  title: "Perceived certainty gap",
  sectionOf: "all-about-alan",
  description:
    "Perceived-certainty gap — the asymmetry between Alan's actual confidence in a claim and the confidence listeners project onto his flat-assertion phrasing, with mechanism, scope, cost, and mitigation.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
