import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const psychologyOfHumanBehavior = {
  id: "019db533-f39e-7e79-a344-4ed8c66ffce8",
  type: "page-type/great-course",
  slug: "psychology-of-human-behavior",
  title: "Psychology of Human Behavior",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1111.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "psychology-of-human-behavior",
      externalLink: "https://www.thegreatcoursesplus.com/psychology-of-human-behavior",
    },
  ],
} as const satisfies GreatCourse
