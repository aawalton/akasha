import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const breakingTheirSilence = {
  id: "019db533-f3a0-714a-9471-163bb5dbee64",
  type: "page-type/great-course",
  slug: "breaking-their-silence",
  title: "Breaking Their Silence",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 135.6,
  ownProgress: 135.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "breaking-their-silence",
      externalLink: "https://www.thegreatcoursesplus.com/breaking-their-silence",
    },
  ],
} as const satisfies GreatCourse
