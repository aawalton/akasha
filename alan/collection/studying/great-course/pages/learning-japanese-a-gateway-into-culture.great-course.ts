import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learningJapaneseAGatewayIntoCulture = {
  id: "019db533-f39f-750d-b24d-c707924c4fb1",
  type: "page-type/great-course",
  slug: "learning-japanese-a-gateway-into-culture",
  title: "Learning Japanese: A Gateway into Culture",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1006.2,
  ownProgress: 1006.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-japanese-a-gateway-into-culture",
      externalLink: "https://www.thegreatcoursesplus.com/learning-japanese-a-gateway-into-culture",
    },
  ],
} as const satisfies GreatCourse
