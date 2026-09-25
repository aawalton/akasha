import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersBeethovenHisLifeAndMusic = {
  id: "019db533-f3a0-758a-adde-f3042a1da3d4",
  type: "page-type/great-course",
  slug: "great-masters-beethoven-his-life-and-music",
  title: "Great Masters: Beethoven—His Life and Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 366,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-masters-beethoven-his-life-and-music",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-masters-beethoven-his-life-and-music",
    },
  ],
} as const satisfies GreatCourse
