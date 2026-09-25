import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheMarvelsOfMedievalTechnology = {
  id: "019db533-f39e-7e03-a3c7-a6ac0a7c31db",
  type: "page-type/great-course",
  slug: "understanding-the-marvels-of-medieval-technology",
  title: "Understanding the Marvels of Medieval Technology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 812.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-marvels-of-medieval-technology",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-marvels-of-medieval-technology",
    },
  ],
} as const satisfies GreatCourse
