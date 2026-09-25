import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lutherGospelLawAndReformation = {
  id: "019db533-f39e-7a31-89dc-14a6a61255ad",
  type: "page-type/great-course",
  slug: "luther-gospel-law-and-reformation",
  title: "Luther: Gospel, Law, and Reformation",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 736.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "luther-gospel-law-and-reformation",
      externalLink: "https://www.thegreatcoursesplus.com/luther-gospel-law-and-reformation",
    },
  ],
} as const satisfies GreatCourse
