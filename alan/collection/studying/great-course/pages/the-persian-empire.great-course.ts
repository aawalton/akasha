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
      externalLink: "https://plus.thegreatcourses.com/the-persian-empire",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
