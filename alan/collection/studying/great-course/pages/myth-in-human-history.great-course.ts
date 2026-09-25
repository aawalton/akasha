import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mythInHumanHistory = {
  id: "019db533-f39e-7819-bb53-0c6c84cfdcfc",
  type: "page-type/great-course",
  slug: "myth-in-human-history",
  title: "Myth in Human History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1101,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "myth-in-human-history",
      externalLink: "https://www.thegreatcoursesplus.com/myth-in-human-history",
    },
  ],
} as const satisfies GreatCourse
