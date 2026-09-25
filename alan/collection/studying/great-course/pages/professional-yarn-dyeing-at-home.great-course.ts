import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const professionalYarnDyeingAtHome = {
  id: "019db533-f39e-7608-b1ae-0cf412066954",
  type: "page-type/great-course",
  slug: "professional-yarn-dyeing-at-home",
  title: "Professional Yarn Dyeing at Home",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 105.6,
  ownProgress: 105.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "professional-yarn-dyeing-at-home",
      externalLink: "https://www.thegreatcoursesplus.com/professional-yarn-dyeing-at-home",
    },
  ],
} as const satisfies GreatCourse
