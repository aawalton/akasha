import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const masterYourPeopleSkills = {
  id: "019db533-f39e-72b8-8e12-e6beb8819693",
  type: "page-type/great-course",
  slug: "master-your-people-skills",
  title: "Master Your People Skills",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1375.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "master-your-people-skills",
      externalLink: "https://www.thegreatcoursesplus.com/master-your-people-skills",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
