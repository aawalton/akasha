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
      externalLink:
        "https://www.thegreatcoursesplus.com/screenwriting-101-mastering-the-art-of-story",
    },
  ],
} as const satisfies GreatCourse
