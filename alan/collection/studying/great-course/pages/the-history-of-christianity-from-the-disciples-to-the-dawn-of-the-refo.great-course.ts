import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryOfChristianityFromTheDisciplesToTheDawnOfTheRefo = {
  id: "019db533-f39f-7f8d-ab93-a28d01000879",
  type: "page-type/great-course",
  slug: "the-history-of-christianity-from-the-disciples-to-the-dawn-of-the-refo",
  title: "The History of Christianity: From the Disciples to the Dawn of the Reformation",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1071,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-of-christianity-from-the-disciples-to-the-dawn-of-the-reformation",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-history-of-christianity-from-the-disciples-to-the-dawn-of-the-reformation",
    },
  ],
} as const satisfies GreatCourse
