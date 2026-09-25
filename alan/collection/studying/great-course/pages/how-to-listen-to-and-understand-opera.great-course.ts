import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToListenToAndUnderstandOpera = {
  id: "019db533-f3a0-7375-8557-6c6b00e992ec",
  type: "page-type/great-course",
  slug: "how-to-listen-to-and-understand-opera",
  title: "How to Listen to and Understand Opera",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1464.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-listen-to-and-understand-opera",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-listen-to-and-understand-opera",
    },
  ],
} as const satisfies GreatCourse
