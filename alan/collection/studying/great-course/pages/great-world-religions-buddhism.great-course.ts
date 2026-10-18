import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatWorldReligionsBuddhism = {
  id: "019db533-f39e-7aea-9c3f-bbe4b8cb2796",
  type: "page-type/great-course",
  slug: "great-world-religions-buddhism",
  title: "Great World Religions: Buddhism",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 371.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-world-religions-buddhism",
      externalLink: "https://plus.thegreatcourses.com/great-world-religions-buddhism",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
