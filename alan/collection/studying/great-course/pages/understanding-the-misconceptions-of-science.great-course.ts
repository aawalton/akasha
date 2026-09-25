import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheMisconceptionsOfScience = {
  id: "019db533-f39e-7db7-88c5-b9686ece4870",
  type: "page-type/great-course",
  slug: "understanding-the-misconceptions-of-science",
  title: "Understanding the Misconceptions of Science",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 738,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-misconceptions-of-science",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-misconceptions-of-science",
    },
  ],
} as const satisfies GreatCourse
