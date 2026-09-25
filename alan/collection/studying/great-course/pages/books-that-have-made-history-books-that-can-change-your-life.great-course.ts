import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const booksThatHaveMadeHistoryBooksThatCanChangeYourLife = {
  id: "019db533-f39e-779c-bd59-e5bbc74486ac",
  type: "page-type/great-course",
  slug: "books-that-have-made-history-books-that-can-change-your-life",
  title: "Books That Have Made History: Books That Can Change Your Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1096.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "books-that-have-made-history-books-that-can-change-your-life",
      externalLink:
        "https://www.thegreatcoursesplus.com/books-that-have-made-history-books-that-can-change-your-life",
    },
  ],
} as const satisfies GreatCourse
