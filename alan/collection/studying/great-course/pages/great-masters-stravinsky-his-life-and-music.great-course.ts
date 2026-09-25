import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersStravinskyHisLifeAndMusic = {
  id: "019db533-f388-7041-b5c0-de3417ef0860",
  type: "page-type/great-course",
  slug: "great-masters-stravinsky-his-life-and-music",
  title: "Great Masters: Stravinsky—His Life and Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 373.783333,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-masters-stravinsky-his-life-and-music",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-masters-stravinsky-his-life-and-music",
    },
  ],
} as const satisfies GreatCourse
