import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whyInsectsMatterEarthSMostEssentialSpecies = {
  id: "019db533-f39e-7d23-b6be-ea62bdc44fe1",
  type: "page-type/great-course",
  slug: "why-insects-matter-earth-s-most-essential-species",
  title: "Why Insects Matter: Earth’s Most Essential Species",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 732,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "why-insects-matter-earth-s-most-essential-species",
      externalLink:
        "https://www.thegreatcoursesplus.com/why-insects-matter-earth-s-most-essential-species",
    },
  ],
} as const satisfies GreatCourse
