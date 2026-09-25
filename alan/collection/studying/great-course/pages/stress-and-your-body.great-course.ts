import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const stressAndYourBody = {
  id: "019db533-f3a0-781b-9d09-31cc9680488e",
  type: "page-type/great-course",
  slug: "stress-and-your-body",
  title: "Stress and Your Body",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 737.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "stress-and-your-body",
      externalLink: "https://www.thegreatcoursesplus.com/stress-and-your-body",
    },
  ],
} as const satisfies GreatCourse
