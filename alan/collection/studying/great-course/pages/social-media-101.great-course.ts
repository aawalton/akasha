import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const socialMedia101 = {
  id: "019db533-f39e-7617-af33-c66b0278eeb6",
  type: "page-type/great-course",
  slug: "social-media-101",
  title: "Social Media 101",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 360.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "social-media-101",
      externalLink: "https://plus.thegreatcourses.com/social-media-101",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
