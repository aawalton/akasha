import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePaganWorldAncientReligionsBeforeChristianity = {
  id: "019db533-f3a0-7079-8edc-a62a34ecc216",
  type: "page-type/great-course",
  slug: "the-pagan-world-ancient-religions-before-christianity",
  title: "The Pagan World: Ancient Religions before Christianity",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 754.8,
  ownProgress: 754.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-pagan-world",
      externalLink: "https://www.thegreatcoursesplus.com/the-pagan-world",
    },
  ],
} as const satisfies GreatCourse
