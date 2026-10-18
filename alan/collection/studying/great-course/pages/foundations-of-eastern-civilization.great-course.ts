import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const foundationsOfEasternCivilization = {
  id: "019db533-f3a0-718e-8ced-5bfa81b020cf",
  type: "page-type/great-course",
  slug: "foundations-of-eastern-civilization",
  title: "Foundations of Eastern Civilization",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1407,
  ownProgress: 1407,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "foundations-of-eastern-civilization",
      externalLink: "https://plus.thegreatcourses.com/foundations-of-eastern-civilization",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
