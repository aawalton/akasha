import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToViewAndAppreciateGreatMovies = {
  id: "019db533-f39e-775d-893b-60c3da5a51ed",
  type: "page-type/great-course",
  slug: "how-to-view-and-appreciate-great-movies",
  title: "How to View and Appreciate Great Movies",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 797.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-view-and-appreciate-great-movies",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-view-and-appreciate-great-movies",
    },
  ],
} as const satisfies GreatCourse
