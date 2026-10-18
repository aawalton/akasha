import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToBecomeASuperstarStudent = {
  id: "019db533-f39e-75ab-9ea9-5e96d2cfec60",
  type: "page-type/great-course",
  slug: "how-to-become-a-superstar-student",
  title: "How to Become a SuperStar Student",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 586.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-become-a-superstar-student",
      externalLink: "https://plus.thegreatcourses.com/how-to-become-a-superstar-student",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
