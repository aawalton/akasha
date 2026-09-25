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
        "https://www.thegreatcoursesplus.com/understanding-the-mysteries-of-human-behavior",
    },
  ],
} as const satisfies GreatCourse
