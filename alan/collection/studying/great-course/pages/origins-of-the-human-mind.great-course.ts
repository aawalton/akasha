import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const originsOfTheHumanMind = {
  id: "019db533-f39f-7011-ae84-765c07145673",
  type: "page-type/great-course",
  slug: "origins-of-the-human-mind",
  title: "Origins of the Human Mind",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 743.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "origins-of-the-human-mind",
      externalLink: "https://www.thegreatcoursesplus.com/origins-of-the-human-mind",
    },
  ],
} as const satisfies GreatCourse
