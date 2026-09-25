import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatAmericanBestsellersTheBooksThatShapedAmerica = {
  id: "019db533-f39e-76f2-b50d-752622eac09f",
  type: "page-type/great-course",
  slug: "great-american-bestsellers-the-books-that-shaped-america",
  title: "Great American Bestsellers: The Books That Shaped America",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 740.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-american-bestsellers-the-books-that-shaped-america",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-american-bestsellers-the-books-that-shaped-america",
    },
  ],
} as const satisfies GreatCourse
