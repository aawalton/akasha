import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const treatingAnxiety = {
  id: "019db533-f3a0-7689-a6e9-ab565d88eaf4",
  type: "page-type/great-course",
  slug: "treating-anxiety",
  title: "Treating Anxiety",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 357,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "treating-anxiety",
      externalLink: "https://www.thegreatcoursesplus.com/treating-anxiety",
    },
  ],
} as const satisfies GreatCourse
