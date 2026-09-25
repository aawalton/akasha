import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const booksThatMatterTheHistoryOfTheDeclineAndFallOfTheRomanEmp = {
  id: "019db533-f3a0-71a1-a119-24a61435fdb7",
  type: "page-type/great-course",
  slug: "books-that-matter-the-history-of-the-decline-and-fall-of-the-roman-emp",
  title: "Books That Matter: The History of the Decline and Fall of the Roman Empire",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 734.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "books-that-matter-the-history-of-the-decline-and-fall-of-the-roman-empire",
      externalLink:
        "https://www.thegreatcoursesplus.com/books-that-matter-the-history-of-the-decline-and-fall-of-the-roman-empire",
    },
  ],
} as const satisfies GreatCourse
