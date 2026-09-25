import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const writingYourStory = {
  id: "019db533-f39e-77a4-b31d-89349096774b",
  type: "page-type/great-course",
  slug: "writing-your-story",
  title: "Writing Your Story",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 319.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "writing-your-story",
      externalLink: "https://www.thegreatcoursesplus.com/writing-your-story",
    },
  ],
} as const satisfies GreatCourse
