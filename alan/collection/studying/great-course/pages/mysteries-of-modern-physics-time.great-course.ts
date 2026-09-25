import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mysteriesOfModernPhysicsTime = {
  id: "019db533-f39f-712a-879a-91f82e7690a4",
  type: "page-type/great-course",
  slug: "mysteries-of-modern-physics-time",
  title: "Mysteries of Modern Physics: Time",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 738,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mysteries-of-modern-physics-time",
      externalLink: "https://www.thegreatcoursesplus.com/mysteries-of-modern-physics-time",
    },
  ],
} as const satisfies GreatCourse
