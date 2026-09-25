import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryAndAchievementsOfTheIslamicGoldenAge = {
  id: "019db533-f3a0-71f7-bcc9-67a7dc3bd815",
  type: "page-type/great-course",
  slug: "the-history-and-achievements-of-the-islamic-golden-age",
  title: "The History and Achievements of the Islamic Golden Age",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 732,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-and-achievements-of-the-islamic-golden-age",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-history-and-achievements-of-the-islamic-golden-age",
    },
  ],
} as const satisfies GreatCourse
