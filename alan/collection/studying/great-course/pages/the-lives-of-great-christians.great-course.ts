import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theLivesOfGreatChristians = {
  id: "019db533-f39e-7bbf-90e9-d642516270ac",
  type: "page-type/great-course",
  slug: "the-lives-of-great-christians",
  title: "The Lives of Great Christians",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 744.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-lives-of-great-christians",
      externalLink: "https://plus.thegreatcourses.com/the-lives-of-great-christians",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
