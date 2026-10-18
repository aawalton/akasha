import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theoriesOfHumanDevelopment = {
  id: "019db533-f39e-7df2-a14f-38bc821176c1",
  type: "page-type/great-course",
  slug: "theories-of-human-development",
  title: "Theories of Human Development",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "theories-of-human-development",
      externalLink: "https://plus.thegreatcourses.com/theories-of-human-development",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
