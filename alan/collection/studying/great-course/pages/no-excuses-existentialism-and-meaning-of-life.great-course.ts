import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const noExcusesExistentialismAndMeaningOfLife = {
  id: "019db533-f39e-7ab3-9b88-dae30dd3c97d",
  type: "page-type/great-course",
  slug: "no-excuses-existentialism-and-meaning-of-life",
  title: "No Excuses: Existentialism and Meaning of Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "no-excuses-existentialism-and-meaning-of-life",
      externalLink:
        "https://www.thegreatcoursesplus.com/no-excuses-existentialism-and-meaning-of-life",
    },
  ],
} as const satisfies GreatCourse
