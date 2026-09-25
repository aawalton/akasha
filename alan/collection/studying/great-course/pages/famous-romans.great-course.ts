import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const famousRomans = {
  id: "019db533-f3a0-755f-945c-b7a242915533",
  type: "page-type/great-course",
  slug: "famous-romans",
  title: "Famous Romans",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 744,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "famous-romans",
      externalLink: "https://www.thegreatcoursesplus.com/famous-romans",
    },
  ],
} as const satisfies GreatCourse
