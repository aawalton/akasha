import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const yogaForAHealthyMindAndBody = {
  id: "019db533-f3a0-7529-b264-f5116d0341dc",
  type: "page-type/great-course",
  slug: "yoga-for-a-healthy-mind-and-body",
  title: "Yoga for a Healthy Mind and Body",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 367.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "yoga-for-a-healthy-mind-and-body",
      externalLink: "https://www.thegreatcoursesplus.com/yoga-for-a-healthy-mind-and-body",
    },
  ],
} as const satisfies GreatCourse
