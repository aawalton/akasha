import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const masterpiecesOfTheImaginativeMindLiteratureSMostFantasticWorks = {
  id: "019db533-f39e-7873-b91d-d20010986b4e",
  type: "page-type/great-course",
  slug: "masterpieces-of-the-imaginative-mind-literature-s-most-fantastic-works",
  title: "Masterpieces of the Imaginative Mind: Literature's Most Fantastic Works",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 753.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "masterpieces-of-the-imaginative-mind-literatures-most-fantastic-works",
      externalLink:
        "https://www.thegreatcoursesplus.com/masterpieces-of-the-imaginative-mind-literatures-most-fantastic-works",
    },
  ],
} as const satisfies GreatCourse
