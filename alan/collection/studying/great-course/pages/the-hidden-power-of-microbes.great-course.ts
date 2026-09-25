import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHiddenPowerOfMicrobes = {
  id: "019db533-f39e-7be5-ab1d-ba5681f117ba",
  type: "page-type/great-course",
  slug: "the-hidden-power-of-microbes",
  title: "The Hidden Power of Microbes",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 626.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-hidden-power-of-microbes",
      externalLink: "https://www.thegreatcoursesplus.com/the-hidden-power-of-microbes",
    },
  ],
} as const satisfies GreatCourse
