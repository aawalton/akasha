import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const masteringTaiChi = {
  id: "019db533-f3a0-77dc-bcc2-3e24f373bfb8",
  type: "page-type/great-course",
  slug: "mastering-tai-chi",
  title: "Mastering Tai Chi",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 751.8,
  ownProgress: 751.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mastering-tai-chi",
      externalLink: "https://www.thegreatcoursesplus.com/mastering-tai-chi",
    },
  ],
} as const satisfies GreatCourse
