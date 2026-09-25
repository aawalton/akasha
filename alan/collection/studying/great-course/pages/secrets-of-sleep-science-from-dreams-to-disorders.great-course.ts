import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const secretsOfSleepScienceFromDreamsToDisorders = {
  id: "019db533-f3a0-78a5-9bd5-d9d67d5db449",
  type: "page-type/great-course",
  slug: "secrets-of-sleep-science-from-dreams-to-disorders",
  title: "Secrets of Sleep Science: From Dreams to Disorders",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "secrets-of-sleep-science-from-dreams-to-disorders",
      externalLink:
        "https://www.thegreatcoursesplus.com/secrets-of-sleep-science-from-dreams-to-disorders",
    },
  ],
} as const satisfies GreatCourse
