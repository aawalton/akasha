import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theTriumphOfChristianity = {
  id: "019db533-f39e-7b3f-9002-efed96b1d34e",
  type: "page-type/great-course",
  slug: "the-triumph-of-christianity",
  title: "The Triumph of Christianity",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 681.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-triumph-of-christianity",
      externalLink: "https://www.thegreatcoursesplus.com/the-triumph-of-christianity",
    },
  ],
} as const satisfies GreatCourse
