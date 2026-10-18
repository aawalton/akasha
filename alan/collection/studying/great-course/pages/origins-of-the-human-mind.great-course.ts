import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const originsOfTheHumanMind = {
  id: "019db533-f39f-7011-ae84-765c07145673",
  type: "page-type/great-course",
  slug: "origins-of-the-human-mind",
  title: "Origins of the Human Mind",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 743.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "origins-of-the-human-mind",
      externalLink: "https://plus.thegreatcourses.com/origins-of-the-human-mind",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
