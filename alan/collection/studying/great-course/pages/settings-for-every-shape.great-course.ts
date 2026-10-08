import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const settingsForEveryShape = {
  id: "019db533-f39e-7636-bb7e-f93d53209be0",
  type: "page-type/great-course",
  slug: "settings-for-every-shape",
  title: "Settings for Every Shape",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 133.8,
  ownProgress: 133.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "settings-for-every-shape",
      externalLink: "https://www.thegreatcoursesplus.com/settings-for-every-shape",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
