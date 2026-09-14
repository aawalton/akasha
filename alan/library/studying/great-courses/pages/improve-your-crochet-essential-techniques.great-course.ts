import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const improveYourCrochetEssentialTechniques = {
  id: "019db533-f39e-7574-98b5-5fa49c386a45",
  type: "great-course",
  slug: "improve-your-crochet-essential-techniques",
  title: "Improve Your Crochet: Essential Techniques",
  status: "completed",
  rank: "D",
  unit: "unit/minutes",
  ownLength: 124.8,
  ownProgress: 124.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "improve-your-crochet-essential-techniques",
      externalLink: "https://www.thegreatcoursesplus.com/improve-your-crochet-essential-techniques",
    },
  ],
} as const satisfies GreatCourse
