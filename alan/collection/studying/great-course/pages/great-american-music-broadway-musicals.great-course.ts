import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatAmericanMusicBroadwayMusicals = {
  id: "01a06578-671b-7002-8e90-6d3ab7028abf",
  type: "page-type/great-course",
  slug: "great-american-music-broadway-musicals",
  title: "Great American Music: Broadway Musicals",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 16,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-american-music-broadway-musicals",
      externalLink: "https://plus.thegreatcourses.com/great-american-music-broadway-musicals",
    },
  ],
} as const satisfies GreatCourse
