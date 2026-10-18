import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSymphony = {
  id: "019db533-f3a0-71df-9182-8af58b7b656d",
  type: "page-type/great-course",
  slug: "the-symphony",
  title: "The Symphony",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1090.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-symphony",
      externalLink: "https://plus.thegreatcourses.com/the-symphony",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
