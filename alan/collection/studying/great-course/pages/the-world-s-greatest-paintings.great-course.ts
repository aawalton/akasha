import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWorldSGreatestPaintings = {
  id: "019db533-f39f-7459-8b4f-722b9a48e37c",
  type: "page-type/great-course",
  slug: "the-world-s-greatest-paintings",
  title: "The World's Greatest Paintings",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 732,
  ownProgress: 732,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-world-s-greatest-paintings",
      externalLink: "https://www.thegreatcoursesplus.com/the-world-s-greatest-paintings",
    },
  ],
} as const satisfies GreatCourse
