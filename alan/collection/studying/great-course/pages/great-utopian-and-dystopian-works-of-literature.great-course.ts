import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatUtopianAndDystopianWorksOfLiterature = {
  id: "019db533-f39e-79d2-a55a-b9244333e2ff",
  type: "page-type/great-course",
  slug: "great-utopian-and-dystopian-works-of-literature",
  title: "Great Utopian and Dystopian Works of Literature",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 748.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-utopian-and-dystopian-works-of-literature",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-utopian-and-dystopian-works-of-literature",
    },
  ],
} as const satisfies GreatCourse
