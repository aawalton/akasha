import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWorldSGreatestChurches = {
  id: "019db533-f39f-77dd-822e-72c784ee6af4",
  type: "page-type/great-course",
  slug: "the-world-s-greatest-churches",
  title: "The World's Greatest Churches",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 757.8,
  ownProgress: 757.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-worlds-greatest-churches",
      externalLink: "https://www.thegreatcoursesplus.com/the-worlds-greatest-churches",
    },
  ],
} as const satisfies GreatCourse
