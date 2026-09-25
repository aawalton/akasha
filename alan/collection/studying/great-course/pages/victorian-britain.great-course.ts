import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const victorianBritain = {
  id: "019db533-f39f-7b33-a5fe-b74a5d754099",
  type: "page-type/great-course",
  slug: "victorian-britain",
  title: "Victorian Britain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1107,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "victorian-britain",
      externalLink: "https://www.thegreatcoursesplus.com/victorian-britain",
    },
  ],
} as const satisfies GreatCourse
