import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatIdeasOfPsychology = {
  id: "019db533-f39f-721f-8e05-b3783a3d744c",
  type: "page-type/great-course",
  slug: "the-great-ideas-of-psychology",
  title: "The Great Ideas of Psychology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1444.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-ideas-of-psychology",
      externalLink: "https://plus.thegreatcourses.com/the-great-ideas-of-psychology",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
