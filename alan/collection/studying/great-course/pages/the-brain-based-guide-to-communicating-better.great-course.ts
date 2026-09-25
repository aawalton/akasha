import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBrainBasedGuideToCommunicatingBetter = {
  id: "019db533-f39e-7d57-aa27-abe2e0d90d4d",
  type: "page-type/great-course",
  slug: "the-brain-based-guide-to-communicating-better",
  title: "The Brain-Based Guide to Communicating Better",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 181.2,
  ownProgress: 181.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-brain-based-guide-to-communicating-better",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-brain-based-guide-to-communicating-better",
    },
  ],
} as const satisfies GreatCourse
