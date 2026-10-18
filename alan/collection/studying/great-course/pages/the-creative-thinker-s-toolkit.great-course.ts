import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theCreativeThinkerSToolkit = {
  id: "019db533-f39e-7292-9c36-cbb01de1e24e",
  type: "page-type/great-course",
  slug: "the-creative-thinker-s-toolkit",
  title: "The Creative Thinker's Toolkit",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 741,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-creative-thinkers-toolkit",
      externalLink: "https://plus.thegreatcourses.com/the-creative-thinkers-toolkit",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
