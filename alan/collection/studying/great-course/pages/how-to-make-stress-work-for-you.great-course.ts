import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToMakeStressWorkForYou = {
  id: "019db533-f3a0-7999-866f-f83d7efa6a83",
  type: "page-type/great-course",
  slug: "how-to-make-stress-work-for-you",
  title: "How to Make Stress Work for You",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 580.2,
  ownProgress: 580.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-make-stress-work-for-you",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-make-stress-work-for-you",
    },
  ],
} as const satisfies GreatCourse
