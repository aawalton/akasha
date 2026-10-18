import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const metalsmithingAtHome = {
  id: "019db533-f39e-74b2-9794-d7f9aea0d44a",
  type: "page-type/great-course",
  slug: "metalsmithing-at-home",
  title: "Metalsmithing at Home",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 404.4,
  ownProgress: 404.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "metalsmithing-at-home",
      externalLink: "https://plus.thegreatcourses.com/metalsmithing-at-home",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
