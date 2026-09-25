import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const argumentationTheStudyOfEffectiveReasoning = {
  id: "019db533-f39e-7dcc-8cd1-32a0be7df6fc",
  type: "page-type/great-course",
  slug: "argumentation-the-study-of-effective-reasoning",
  title: "Argumentation: The Study of Effective Reasoning",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 732,
  ownProgress: 732,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "argumentation-the-study-of-effective-reasoning",
      externalLink:
        "https://www.thegreatcoursesplus.com/argumentation-the-study-of-effective-reasoning",
    },
  ],
} as const satisfies GreatCourse
