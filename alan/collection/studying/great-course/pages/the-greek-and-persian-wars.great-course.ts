import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreekAndPersianWars = {
  id: "019db533-f3a0-708c-a3f3-68afed527202",
  type: "page-type/great-course",
  slug: "the-greek-and-persian-wars",
  title: "The Greek and Persian Wars",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 740.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-greek-and-persian-wars",
      externalLink: "https://www.thegreatcoursesplus.com/the-greek-and-persian-wars",
    },
  ],
} as const satisfies GreatCourse
