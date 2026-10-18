import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatPianoWorksExplained = {
  id: "019db533-f3a0-7366-afba-83b0af530edb",
  type: "page-type/great-course",
  slug: "great-piano-works-explained",
  title: "Great Piano Works Explained",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 795,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-piano-works-explained",
      externalLink: "https://plus.thegreatcourses.com/great-piano-works-explained",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
