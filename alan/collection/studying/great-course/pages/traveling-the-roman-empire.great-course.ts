import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const travelingTheRomanEmpire = {
  id: "019db533-f39f-7479-a811-2cf1b08bb53b",
  type: "page-type/great-course",
  slug: "traveling-the-roman-empire",
  title: "Traveling The Roman Empire",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 290.4,
  ownProgress: 290.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "traveling-the-roman-empire",
      externalLink: "https://www.thegreatcoursesplus.com/traveling-the-roman-empire",
    },
  ],
} as const satisfies GreatCourse
