import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToPublishYourBook = {
  id: "019db533-f39e-782f-8634-8dc7e2bac458",
  type: "page-type/great-course",
  slug: "how-to-publish-your-book",
  title: "How to Publish Your Book",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 697.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-publish-your-book",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-publish-your-book",
    },
  ],
} as const satisfies GreatCourse
