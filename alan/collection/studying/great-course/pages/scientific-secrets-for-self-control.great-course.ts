import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const scientificSecretsForSelfControl = {
  id: "019db533-f3a0-78b0-8ce7-a1ad12952971",
  type: "page-type/great-course",
  slug: "scientific-secrets-for-self-control",
  title: "Scientific Secrets for Self-Control",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 183,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "scientific-secrets-for-self-control",
      externalLink: "https://plus.thegreatcourses.com/scientific-secrets-for-self-control",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
