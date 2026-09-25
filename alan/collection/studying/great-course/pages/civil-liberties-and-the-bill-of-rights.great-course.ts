import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const civilLibertiesAndTheBillOfRights = {
  id: "01a06578-6717-7002-95d0-d54d3f0aacae",
  type: "page-type/great-course",
  slug: "civil-liberties-and-the-bill-of-rights",
  title: "Civil Liberties and the Bill of Rights",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 36,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "civil-liberties-and-the-bill-of-rights",
      externalLink: "https://plus.thegreatcourses.com/civil-liberties-and-the-bill-of-rights",
    },
  ],
} as const satisfies GreatCourse
