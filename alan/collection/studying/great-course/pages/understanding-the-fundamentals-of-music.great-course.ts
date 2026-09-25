import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheFundamentalsOfMusic = {
  id: "019db533-f3a0-7201-bb90-a2145dedd00a",
  type: "page-type/great-course",
  slug: "understanding-the-fundamentals-of-music",
  title: "Understanding the Fundamentals of Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 730.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-fundamentals-of-music",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-the-fundamentals-of-music",
    },
  ],
} as const satisfies GreatCourse
