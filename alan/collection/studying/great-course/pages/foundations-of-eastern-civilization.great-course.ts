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
      externalLink: "https://www.thegreatcoursesplus.com/foundations-of-eastern-civilization",
    },
  ],
} as const satisfies GreatCourse
