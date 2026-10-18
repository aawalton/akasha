import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const screenwriting101MasteringTheArtOfStory = {
  id: "019db533-f39e-7846-8832-2b3102391d3a",
  type: "page-type/great-course",
  slug: "screenwriting-101-mastering-the-art-of-story",
  title: "Screenwriting 101: Mastering the Art of Story",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 769.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "screenwriting-101-mastering-the-art-of-story",
      externalLink: "https://plus.thegreatcourses.com/screenwriting-101-mastering-the-art-of-story",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
