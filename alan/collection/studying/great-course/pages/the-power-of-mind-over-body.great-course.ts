import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePowerOfMindOverBody = {
  id: "019db533-f3a0-76a9-ba74-202f6e9cf50f",
  type: "page-type/great-course",
  slug: "the-power-of-mind-over-body",
  title: "The Power of Mind over Body",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 345,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-power-of-mind-over-body",
      externalLink: "https://plus.thegreatcourses.com/the-power-of-mind-over-body",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
