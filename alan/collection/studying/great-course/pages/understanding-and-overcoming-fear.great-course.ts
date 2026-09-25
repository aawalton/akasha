import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingAndOvercomingFear = {
  id: "019db533-f39e-7d41-a681-b0c98f5269ab",
  type: "page-type/great-course",
  slug: "understanding-and-overcoming-fear",
  title: "Understanding and Overcoming Fear",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 696,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-and-overcoming-fear",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-and-overcoming-fear",
    },
  ],
} as const satisfies GreatCourse
