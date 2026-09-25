import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const plusPilotTreatingYourPoisonedPet = {
  id: "019db533-f3a0-7752-aa72-db555edd7c03",
  type: "page-type/great-course",
  slug: "plus-pilot-treating-your-poisoned-pet",
  title: "Plus Pilot: Treating Your Poisoned Pet",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 29.4,
  ownProgress: 29.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilot-treating-your-poisoned-pet",
      externalLink: "https://www.thegreatcoursesplus.com/plus-pilot-treating-your-poisoned-pet",
    },
  ],
} as const satisfies GreatCourse
