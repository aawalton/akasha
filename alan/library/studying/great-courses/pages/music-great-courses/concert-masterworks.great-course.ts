import type { GreatCourse } from "../../great-course.page-type.ts"

export const concertMasterworks = {
  id: "019db533-f3a0-751f-b1f7-80b3fc502c44",
  pageTypeSlug: "great-course",
  slug: "concert-masterworks",
  title: "Concert Masterworks",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1479.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "concert-masterworks",
  externalLink: "https://www.thegreatcoursesplus.com/concert-masterworks",
} as const satisfies GreatCourse
