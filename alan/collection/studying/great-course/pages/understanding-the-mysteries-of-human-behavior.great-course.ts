import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheMysteriesOfHumanBehavior = {
  id: "019db533-f39f-706a-a60a-c63e70126164",
  type: "page-type/great-course",
  slug: "understanding-the-mysteries-of-human-behavior",
  title: "Understanding the Mysteries of Human Behavior",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 731.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-mysteries-of-human-behavior",
      externalLink:
        "https://plus.thegreatcourses.com/understanding-the-mysteries-of-human-behavior",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
