import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePowerOfBodyLanguage = {
  id: "019db533-f39e-7283-b9e1-68784f043833",
  type: "page-type/great-course",
  slug: "the-power-of-body-language",
  title: "The Power of Body Language",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 931.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-power-of-body-language",
      externalLink: "https://www.thegreatcoursesplus.com/the-power-of-body-language",
    },
  ],
} as const satisfies GreatCourse
