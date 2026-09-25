import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersTchaikovskyHisLifeAndMusic = {
  id: "019db533-f3a0-746f-801e-655e4385b4d5",
  type: "page-type/great-course",
  slug: "great-masters-tchaikovsky-his-life-and-music",
  title: "Great Masters: Tchaikovsky—His Life and Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 367.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-masters-tchaikovskyhis-life-and-music",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-masters-tchaikovskyhis-life-and-music",
    },
  ],
} as const satisfies GreatCourse
