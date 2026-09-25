import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const historyOfTheBibleTheMakingOfTheNewTestamentCanon = {
  id: "019db533-f39e-7ad3-b09e-e72c2a9a73e4",
  type: "page-type/great-course",
  slug: "history-of-the-bible-the-making-of-the-new-testament-canon",
  title: "History of the Bible: The Making of the New Testament Canon",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 369,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "history-of-the-bible-the-making-of-the-new-testament-canon",
      externalLink:
        "https://www.thegreatcoursesplus.com/history-of-the-bible-the-making-of-the-new-testament-canon",
    },
  ],
} as const satisfies GreatCourse
