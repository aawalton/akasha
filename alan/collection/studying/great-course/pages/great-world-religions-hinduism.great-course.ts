import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatWorldReligionsHinduism = {
  id: "019db533-f39e-7d3a-86da-b0dc3c8ba0bc",
  type: "page-type/great-course",
  slug: "great-world-religions-hinduism",
  title: "Great World Religions: Hinduism",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 361.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-world-religions-hinduism",
      externalLink: "https://plus.thegreatcourses.com/great-world-religions-hinduism",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
