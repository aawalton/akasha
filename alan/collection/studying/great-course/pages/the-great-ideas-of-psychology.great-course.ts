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
      externalLink: "https://www.thegreatcoursesplus.com/the-great-ideas-of-psychology",
    },
  ],
} as const satisfies GreatCourse
