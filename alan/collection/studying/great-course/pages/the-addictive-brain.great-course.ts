import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAddictiveBrain = {
  id: "019db533-f3a0-7669-bc12-b22330fe3205",
  type: "page-type/great-course",
  slug: "the-addictive-brain",
  title: "The Addictive Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 383.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-addictive-brain",
      externalLink: "https://www.thegreatcoursesplus.com/the-addictive-brain",
    },
  ],
} as const satisfies GreatCourse
