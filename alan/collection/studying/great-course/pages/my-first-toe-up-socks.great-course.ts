import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const myFirstToeUpSocks = {
  id: "019db533-f39e-7438-9119-ac8ca241a4ae",
  type: "page-type/great-course",
  slug: "my-first-toe-up-socks",
  title: "My First Toe-Up Socks",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 117,
  ownProgress: 117,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "my-first-toe-up-socks",
      externalLink: "https://www.thegreatcoursesplus.com/my-first-toe-up-socks",
    },
  ],
} as const satisfies GreatCourse
