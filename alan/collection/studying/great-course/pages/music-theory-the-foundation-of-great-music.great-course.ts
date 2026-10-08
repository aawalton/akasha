import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const musicTheoryTheFoundationOfGreatMusic = {
  id: "019db533-f3a0-72cd-93c0-6a4dcace14fe",
  type: "page-type/great-course",
  slug: "music-theory-the-foundation-of-great-music",
  title: "Music Theory: The Foundation of Great Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 449.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "music-theory-the-foundation-of-great-music",
      externalLink:
        "https://www.thegreatcoursesplus.com/music-theory-the-foundation-of-great-music",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
