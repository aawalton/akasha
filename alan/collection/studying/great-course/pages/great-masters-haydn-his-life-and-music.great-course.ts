import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersHaydnHisLifeAndMusic = {
  id: "019db533-f3a0-75ea-8cc0-d2190aee4477",
  type: "page-type/great-course",
  slug: "great-masters-haydn-his-life-and-music",
  title: "Great Masters: Haydn-His Life and Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 364.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-masters-haydn-his-life-and-music",
      externalLink: "https://www.thegreatcoursesplus.com/great-masters-haydn-his-life-and-music",
    },
  ],
} as const satisfies GreatCourse
