import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheSecretsOfHumanPerception = {
  id: "019db533-f39f-70df-b658-57cbfb99429e",
  type: "page-type/great-course",
  slug: "understanding-the-secrets-of-human-perception",
  title: "Understanding the Secrets of Human Perception",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-secrets-of-human-perception",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-secrets-of-human-perception",
    },
  ],
} as const satisfies GreatCourse
