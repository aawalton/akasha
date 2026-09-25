import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBlackDeathTheWorldSMostDevastatingPlague = {
  id: "019db533-f3a0-722d-883e-e56bb8c43352",
  type: "page-type/great-course",
  slug: "the-black-death-the-world-s-most-devastating-plague",
  title: "The Black Death: The World's Most Devastating Plague",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 732.6,
  ownProgress: 732.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-black-death-the-worlds-most-devastating-plague",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-black-death-the-worlds-most-devastating-plague",
    },
  ],
} as const satisfies GreatCourse
