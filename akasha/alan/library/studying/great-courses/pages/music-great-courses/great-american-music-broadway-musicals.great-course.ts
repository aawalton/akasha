import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatAmericanMusicBroadwayMusicals = {
  id: "47d1cf70-c939-510d-a899-58e8b7028abf",
  pageTypeSlug: "great-course",
  slug: "great-american-music-broadway-musicals",
  title: "Great American Music: Broadway Musicals",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 16,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "great-american-music-broadway-musicals",
  externalLink: "https://plus.thegreatcourses.com/great-american-music-broadway-musicals",
} as const satisfies GreatCourse
