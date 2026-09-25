import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const beginningsOfJudaism = {
  id: "019db533-f39e-7d4e-8efc-2dcee2cd9fb3",
  type: "page-type/great-course",
  slug: "beginnings-of-judaism",
  title: "Beginnings of Judaism",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 246.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "beginnings-of-judaism",
      externalLink: "https://www.thegreatcoursesplus.com/beginnings-of-judaism",
    },
  ],
} as const satisfies GreatCourse
