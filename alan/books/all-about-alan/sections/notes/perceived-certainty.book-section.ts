import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const perceivedCertainty = {
  id: "01a06594-c67b-7014-a6b9-ba7717089902",
  pageTypeSlug: "book-section",
  slug: "perceived-certainty",
  title: "Perceived certainty gap",
  sectionOfSlug: "all-about-alan",
  description:
    "Perceived-certainty gap — the asymmetry between Alan's actual confidence in a claim and the confidence listeners project onto his flat-assertion phrasing, with mechanism, scope, cost, and mitigation.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
