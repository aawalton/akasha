import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureLittleSecretsForHeartAndBrainHealth = {
  id: "019db533-f3a0-7747-9d1e-6f1074075276",
  type: "page-type/great-course",
  slug: "pilot-lecture-little-secrets-for-heart-and-brain-health",
  title: "Pilot Lecture: Little Secrets for Heart and Brain Health",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 28.2,
  ownProgress: 28.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-little-secrets-for-heart-and-brain-health",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-little-secrets-for-heart-and-brain-health",
    },
  ],
} as const satisfies GreatCourse
