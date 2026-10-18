import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToPaint = {
  id: "019db533-f39f-760a-9c4e-c0c5006665d3",
  type: "page-type/great-course",
  slug: "how-to-paint",
  title: "How to Paint",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 778.2,
  ownProgress: 778.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-paint",
      externalLink: "https://plus.thegreatcourses.com/how-to-paint",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
