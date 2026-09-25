import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lighting101 = {
  id: "019db533-f39e-72c0-8deb-c4652ea69124",
  type: "page-type/great-course",
  slug: "lighting-101",
  title: "Lighting 101",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 533.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "lighting-101",
      externalLink: "https://www.thegreatcoursesplus.com/lighting-101",
    },
  ],
} as const satisfies GreatCourse
