import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const didYouKnow = {
  id: "019db533-f39e-763e-8359-11be06a56c45",
  type: "page-type/great-course",
  slug: "did-you-know",
  title: "Did You Know?",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 129,
  ownProgress: 129,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "did-you-know",
      externalLink: "https://plus.thegreatcourses.com/did-you-know",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
