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
      externalLink: "https://www.thegreatcoursesplus.com/how-to-become-a-superstar-student",
    },
  ],
} as const satisfies GreatCourse
