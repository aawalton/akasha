import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const historyOfRussiaFromPeterTheGreatToGorbachev = {
  id: "019db533-f39f-7852-bdc3-f100a9a3060f",
  type: "page-type/great-course",
  slug: "history-of-russia-from-peter-the-great-to-gorbachev",
  title: "History of Russia: From Peter the Great to Gorbachev",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1114.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "history-of-russia-from-peter-the-great-to-gorbachev",
      externalLink:
        "https://www.thegreatcoursesplus.com/history-of-russia-from-peter-the-great-to-gorbachev",
    },
  ],
} as const satisfies GreatCourse
