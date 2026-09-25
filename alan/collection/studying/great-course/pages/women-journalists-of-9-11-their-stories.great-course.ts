import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const womenJournalistsOf911TheirStories = {
  id: "019db533-f39f-7a9e-ac93-d35bef4b3fa1",
  type: "page-type/great-course",
  slug: "women-journalists-of-9-11-their-stories",
  title: "Women Journalists of 9/11: Their Stories",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 325.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "women-journalists-of-9-11-their-stories",
      externalLink: "https://www.thegreatcoursesplus.com/women-journalists-of-9-11-their-stories",
    },
  ],
} as const satisfies GreatCourse
