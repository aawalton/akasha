import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const warInTheModernWorld = {
  id: "019db533-f39f-77f2-b022-5b82fc0cbf4c",
  type: "page-type/great-course",
  slug: "war-in-the-modern-world",
  title: "War in the Modern World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 680.4,
  ownProgress: 680.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "war-in-the-modern-world",
      externalLink: "https://www.thegreatcoursesplus.com/war-in-the-modern-world",
    },
  ],
} as const satisfies GreatCourse
