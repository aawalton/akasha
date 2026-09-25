import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theStoryOfTheMediterraneanWorld = {
  id: "01a06578-6718-7006-afa7-1e930e1d2090",
  type: "page-type/great-course",
  slug: "the-story-of-the-mediterranean-world",
  title: "The Story of the Mediterranean World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-story-of-the-mediterranean-world",
      externalLink: "https://plus.thegreatcourses.com/the-story-of-the-mediterranean-world",
    },
  ],
} as const satisfies GreatCourse
