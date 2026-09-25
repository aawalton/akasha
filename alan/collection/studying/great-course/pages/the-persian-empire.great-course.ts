import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePersianEmpire = {
  id: "019db533-f39f-7ba8-a898-8096588b0225",
  type: "page-type/great-course",
  slug: "the-persian-empire",
  title: "The Persian Empire",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 718.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-persian-empire",
      externalLink: "https://www.thegreatcoursesplus.com/the-persian-empire",
    },
  ],
} as const satisfies GreatCourse
