import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersLisztHisLifeAndMusic = {
  id: "019db533-f3a0-7514-8c33-739ff93c83ee",
  type: "page-type/great-course",
  slug: "great-masters-liszt-his-life-and-music",
  title: "Great Masters: Liszt-His Life and Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 372.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-masters-liszt-his-life-and-music",
      externalLink: "https://www.thegreatcoursesplus.com/great-masters-liszt-his-life-and-music",
    },
  ],
} as const satisfies GreatCourse
