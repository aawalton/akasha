import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const existentialismAndTheAuthenticLife = {
  id: "019db533-f39e-7b10-849b-44c9c68fffe5",
  type: "page-type/great-course",
  slug: "existentialism-and-the-authentic-life",
  title: "Existentialism and the Authentic Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 717.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "existentialism-and-the-authentic-life",
      externalLink: "https://www.thegreatcoursesplus.com/existentialism-and-the-authentic-life",
    },
  ],
} as const satisfies GreatCourse
