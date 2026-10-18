import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const alexanderTheGreatAndTheMacedonianEmpire = {
  id: "019db533-f3a0-7006-a96c-90983caa23bd",
  type: "page-type/great-course",
  slug: "alexander-the-great-and-the-macedonian-empire",
  title: "Alexander the Great and the Macedonian Empire",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1102.2,
  ownProgress: 1102.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "alexander-the-great-and-the-macedonian-empire",
      externalLink:
        "https://plus.thegreatcourses.com/alexander-the-great-and-the-macedonian-empire",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
