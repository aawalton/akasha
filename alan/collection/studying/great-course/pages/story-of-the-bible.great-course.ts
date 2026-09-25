import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const storyOfTheBible = {
  id: "019db533-f39e-7a75-8921-e85bf279095f",
  type: "page-type/great-course",
  slug: "story-of-the-bible",
  title: "Story of the Bible",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 723,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "story-of-the-bible",
      externalLink: "https://www.thegreatcoursesplus.com/story-of-the-bible",
    },
  ],
} as const satisfies GreatCourse
