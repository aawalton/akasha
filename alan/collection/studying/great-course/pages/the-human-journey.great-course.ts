import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHumanJourney = {
  id: "019db533-f39f-7174-af48-d870995467fe",
  type: "page-type/great-course",
  slug: "the-human-journey",
  title: "The Human Journey",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 369.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-human-journey",
      externalLink: "https://plus.thegreatcourses.com/the-human-journey",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
