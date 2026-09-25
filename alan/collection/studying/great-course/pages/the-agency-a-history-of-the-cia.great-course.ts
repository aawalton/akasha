import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAgencyAHistoryOfTheCia = {
  id: "019db533-f3a0-710d-bed5-6839d7bedab6",
  type: "page-type/great-course",
  slug: "the-agency-a-history-of-the-cia",
  title: "The Agency: A History of the CIA",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 693.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-agency-a-history-of-the-cia",
      externalLink: "https://www.thegreatcoursesplus.com/the-agency-a-history-of-the-cia",
    },
  ],
} as const satisfies GreatCourse
