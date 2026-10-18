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
      externalLink: "https://plus.thegreatcourses.com/victorian-britain",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
