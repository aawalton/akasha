import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const philosophyOfReligion = {
  id: "019db533-f39e-7a46-bd3d-351c8ecde7ba",
  type: "page-type/great-course",
  slug: "philosophy-of-religion",
  title: "Philosophy of Religion",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1097.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "philosophy-of-religion",
      externalLink: "https://plus.thegreatcourses.com/philosophy-of-religion",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
