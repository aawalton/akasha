import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMindBendingPhysicsOfStringTheory = {
  id: "019db533-f39e-7bde-915b-719933b648db",
  type: "page-type/great-course",
  slug: "the-mind-bending-physics-of-string-theory",
  title: "The Mind-Bending Physics of String Theory",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 255,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-mind-bending-physics-of-string-theory",
      externalLink: "https://www.thegreatcoursesplus.com/the-mind-bending-physics-of-string-theory",
    },
  ],
} as const satisfies GreatCourse
