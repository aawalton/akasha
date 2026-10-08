import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greekTragedy = {
  id: "019db533-f39e-7912-bd35-17806a00eefe",
  type: "page-type/great-course",
  slug: "greek-tragedy",
  title: "Greek Tragedy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 741,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "greek-tragedy",
      externalLink: "https://www.thegreatcoursesplus.com/greek-tragedy",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
