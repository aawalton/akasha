import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBlackDeathDidHumansSpreadThePlague = {
  id: "019db533-f3a0-711c-9c83-a093af53e18c",
  type: "page-type/great-course",
  slug: "the-black-death-did-humans-spread-the-plague",
  title: "The Black Death: Did Humans Spread the Plague?",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 10.8,
  ownProgress: 10.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-black-death-did-humans-spread-the-plague",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-black-death-did-humans-spread-the-plague",
    },
  ],
} as const satisfies GreatCourse
