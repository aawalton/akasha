import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatScientificIdeasThatChangedTheWorld = {
  id: "019db533-f39e-7e59-8e07-c7db21d0f507",
  type: "page-type/great-course",
  slug: "great-scientific-ideas-that-changed-the-world",
  title: "Great Scientific Ideas That Changed the World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1150.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-scientific-ideas-that-changed-the-world",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-scientific-ideas-that-changed-the-world",
    },
  ],
} as const satisfies GreatCourse
