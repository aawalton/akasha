import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const cardmakingEssentialsThankYouCards = {
  id: "019db533-f39f-7635-a292-7cd2e0d3e00e",
  type: "page-type/great-course",
  slug: "cardmaking-essentials-thank-you-cards",
  title: "Cardmaking Essentials: Thank You Cards",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 131.4,
  ownProgress: 131.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cardmaking-essentials-thank-you-cards",
      externalLink: "https://www.thegreatcoursesplus.com/cardmaking-essentials-thank-you-cards",
    },
  ],
} as const satisfies GreatCourse
