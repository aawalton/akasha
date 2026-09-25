import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersMozartHisLifeAndMusic = {
  id: "019db533-f3a0-7391-ae85-0a82d1eeb925",
  type: "page-type/great-course",
  slug: "great-masters-mozart-his-life-and-music",
  title: "Great Masters: Mozart—His Life and Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 369,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-masters-mozarthis-life-and-music",
      externalLink: "https://www.thegreatcoursesplus.com/great-masters-mozarthis-life-and-music",
    },
  ],
} as const satisfies GreatCourse
