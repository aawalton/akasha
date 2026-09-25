import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const essentialsOfTaiChiAndQigong = {
  id: "019db533-f3a0-790f-90a3-998438e7a153",
  type: "page-type/great-course",
  slug: "essentials-of-tai-chi-and-qigong",
  title: "Essentials of Tai Chi and Qigong",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 744.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "essentials-of-tai-chi-and-qigong",
      externalLink: "https://www.thegreatcoursesplus.com/essentials-of-tai-chi-and-qigong",
    },
  ],
} as const satisfies GreatCourse
