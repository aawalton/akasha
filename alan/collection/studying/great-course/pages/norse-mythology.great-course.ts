import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const norseMythology = {
  id: "019db533-f39e-78b6-91fe-7ceda2c1d2ae",
  type: "page-type/great-course",
  slug: "norse-mythology",
  title: "Norse Mythology",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 681.03,
  ownProgress: 59.68,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "norse-mythology",
      externalLink: "https://plus.thegreatcourses.com/norse-mythology",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-19T17:40:57.258Z",
  progressedAt: "2026-10-19T17:40:57.258Z",
} as const satisfies GreatCourse
