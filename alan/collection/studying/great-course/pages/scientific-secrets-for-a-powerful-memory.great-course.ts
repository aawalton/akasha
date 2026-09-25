import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const scientificSecretsForAPowerfulMemory = {
  id: "019db533-f3a0-7811-89a5-780701eefc62",
  type: "page-type/great-course",
  slug: "scientific-secrets-for-a-powerful-memory",
  title: "Scientific Secrets for a Powerful Memory",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 185.4,
  ownProgress: 185.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "scientific-secrets-for-a-powerful-memory",
      externalLink: "https://www.thegreatcoursesplus.com/scientific-secrets-for-a-powerful-memory",
    },
  ],
} as const satisfies GreatCourse
