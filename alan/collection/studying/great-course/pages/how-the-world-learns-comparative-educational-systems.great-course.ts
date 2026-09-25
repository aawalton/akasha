import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howTheWorldLearnsComparativeEducationalSystems = {
  id: "019db533-f39e-7e63-9a06-bb06df2978ec",
  type: "page-type/great-course",
  slug: "how-the-world-learns-comparative-educational-systems",
  title: "How the World Learns: Comparative Educational Systems",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 741,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-the-world-learns-comparative-educational-systems",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-the-world-learns-comparative-educational-systems",
    },
  ],
} as const satisfies GreatCourse
