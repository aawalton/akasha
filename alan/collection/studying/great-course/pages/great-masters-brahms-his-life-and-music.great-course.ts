import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersBrahmsHisLifeAndMusic = {
  id: "019db533-f3a0-75d4-88c1-d7d737b78eaa",
  type: "page-type/great-course",
  slug: "great-masters-brahms-his-life-and-music",
  title: "Great Masters: Brahms—His Life and Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 367.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-masters-brahmshis-life-and-music",
      externalLink: "https://www.thegreatcoursesplus.com/great-masters-brahmshis-life-and-music",
    },
  ],
} as const satisfies GreatCourse
