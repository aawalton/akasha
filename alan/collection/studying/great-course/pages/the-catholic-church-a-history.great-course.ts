import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theCatholicChurchAHistory = {
  id: "019db533-f39e-7aa4-b888-008baaaedd14",
  type: "page-type/great-course",
  slug: "the-catholic-church-a-history",
  title: "The Catholic Church: A History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1145.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-catholic-church-a-history",
      externalLink: "https://www.thegreatcoursesplus.com/the-catholic-church-a-history",
    },
  ],
} as const satisfies GreatCourse
