import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatWorldReligionsChristianity = {
  id: "019db533-f39e-7ce3-a3a6-90867510e34e",
  type: "page-type/great-course",
  slug: "great-world-religions-christianity",
  title: "Great World Religions: Christianity",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 367.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-world-religions-christianity",
      externalLink: "https://plus.thegreatcourses.com/great-world-religions-christianity",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
