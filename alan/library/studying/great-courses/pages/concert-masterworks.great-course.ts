import type { GreatCourse } from "../great-course.page-type.types.ts"

export const concertMasterworks = {
  id: "019db533-f3a0-751f-b1f7-80b3fc502c44",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "concert-masterworks",
  title: "Concert Masterworks",
  status: "not-started",
  unit: "minutes",
  ownLength: 1479.6,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "concert-masterworks",
  externalLink: "https://www.thegreatcoursesplus.com/concert-masterworks",
} as const satisfies GreatCourse
