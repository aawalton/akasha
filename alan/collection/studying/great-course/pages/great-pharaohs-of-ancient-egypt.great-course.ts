import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatPharaohsOfAncientEgypt = {
  id: "019db533-f3a0-7188-b214-31f28e7b4766",
  type: "page-type/great-course",
  slug: "great-pharaohs-of-ancient-egypt",
  title: "Great Pharaohs of Ancient Egypt",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 367.2,
  ownProgress: 367.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-pharaohs-of-ancient-egypt",
      externalLink: "https://www.thegreatcoursesplus.com/great-pharaohs-of-ancient-egypt",
    },
  ],
} as const satisfies GreatCourse
