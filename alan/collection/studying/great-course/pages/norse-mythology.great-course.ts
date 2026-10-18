import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const norseMythology = {
  id: "019db533-f39e-78b6-91fe-7ceda2c1d2ae",
  type: "page-type/great-course",
  slug: "norse-mythology",
  title: "Norse Mythology",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 681,
  ownProgress: 56.75,
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
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
