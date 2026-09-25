import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const consciousnessAndItsImplications = {
  id: "019db533-f388-700a-a301-be7427dfa9b4",
  type: "page-type/great-course",
  slug: "consciousness-and-its-implications",
  title: "Consciousness and Its Implications",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 364.433333,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "consciousness-and-its-implications",
      externalLink: "https://www.thegreatcoursesplus.com/consciousness-and-its-implications",
    },
  ],
} as const satisfies GreatCourse
