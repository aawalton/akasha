import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theCelticWorld = {
  id: "019db533-f3a0-70c8-b3e5-fb4a51b050cc",
  type: "page-type/great-course",
  slug: "the-celtic-world",
  title: "The Celtic World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 775.8,
  ownProgress: 775.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-celtic-world",
      externalLink: "https://www.thegreatcoursesplus.com/the-celtic-world",
    },
  ],
} as const satisfies GreatCourse
