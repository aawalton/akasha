import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const englandThe1960sAndTheTriumphOfTheBeatles = {
  id: "019db533-f3a0-74b9-8e03-a38dc656c311",
  type: "page-type/great-course",
  slug: "england-the-1960s-and-the-triumph-of-the-beatles",
  title: "England, the 1960s, and the Triumph of the Beatles",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 310.2,
  ownProgress: 310.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "england-the-1960s-and-the-triumph-of-the-beatles",
      externalLink:
        "https://www.thegreatcoursesplus.com/england-the-1960s-and-the-triumph-of-the-beatles",
    },
  ],
} as const satisfies GreatCourse
