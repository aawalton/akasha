import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mindBodyPhilosophy = {
  id: "019db533-f3a0-773d-8070-2eab9a2cd090",
  type: "page-type/great-course",
  slug: "mind-body-philosophy",
  title: "Mind-Body Philosophy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 748.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mind-body-philosophy",
      externalLink: "https://www.thegreatcoursesplus.com/mind-body-philosophy",
    },
  ],
} as const satisfies GreatCourse
