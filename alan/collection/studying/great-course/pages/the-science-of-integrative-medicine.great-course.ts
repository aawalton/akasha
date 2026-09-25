import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScienceOfIntegrativeMedicine = {
  id: "019db533-f3a0-761e-b22f-f8c807603920",
  type: "page-type/great-course",
  slug: "the-science-of-integrative-medicine",
  title: "The Science of Integrative Medicine",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 357,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-science-of-integrative-medicine",
      externalLink: "https://www.thegreatcoursesplus.com/the-science-of-integrative-medicine",
    },
  ],
} as const satisfies GreatCourse
