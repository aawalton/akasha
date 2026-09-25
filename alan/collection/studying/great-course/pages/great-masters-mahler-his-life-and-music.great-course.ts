import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersMahlerHisLifeAndMusic = {
  id: "019db533-f3a0-74c7-bd67-b77185095fd1",
  type: "page-type/great-course",
  slug: "great-masters-mahler-his-life-and-music",
  title: "Great Masters: Mahler—His Life and Music",
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
      externalId: "great-masters-mahlerhis-life-and-music",
      externalLink: "https://www.thegreatcoursesplus.com/great-masters-mahlerhis-life-and-music",
    },
  ],
} as const satisfies GreatCourse
