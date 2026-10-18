import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const concertMasterworks = {
  id: "019db533-f3a0-751f-b1f7-80b3fc502c44",
  type: "page-type/great-course",
  slug: "concert-masterworks",
  title: "Concert Masterworks",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1479.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "concert-masterworks",
      externalLink: "https://plus.thegreatcourses.com/concert-masterworks",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
