import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const robotics = {
  id: "019db533-f39e-7ee3-9d3e-123f426b8373",
  type: "page-type/great-course",
  slug: "robotics",
  title: "Robotics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 762.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "robotics",
      externalLink: "https://www.thegreatcoursesplus.com/robotics",
    },
  ],
} as const satisfies GreatCourse
