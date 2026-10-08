import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theVaticanAndTheWorldOfItalianArt = {
  id: "01a06578-6719-7008-8a32-cba3895c1746",
  type: "page-type/great-course",
  slug: "the-vatican-and-the-world-of-italian-art",
  title: "The Vatican and the World of Italian Art",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 14,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-vatican-and-the-world-of-italian-art",
      externalLink: "https://plus.thegreatcourses.com/the-vatican-and-the-world-of-italian-art",
    },
  ],
  createdAt: "2026-09-03T04:13:04.665Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
