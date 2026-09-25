import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const einsteinSLegacyModernPhysicsAllAroundYou = {
  id: "019db533-f39f-727e-abc1-b7411e1e13c7",
  type: "page-type/great-course",
  slug: "einstein-s-legacy-modern-physics-all-around-you",
  title: "Einstein’s Legacy: Modern Physics All around You",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 292.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "einstein-s-legacy-modern-physics-all-around-you",
      externalLink:
        "https://www.thegreatcoursesplus.com/einstein-s-legacy-modern-physics-all-around-you",
    },
  ],
} as const satisfies GreatCourse
