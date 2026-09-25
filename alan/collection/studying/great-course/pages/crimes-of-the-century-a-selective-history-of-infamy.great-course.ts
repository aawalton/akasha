import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const crimesOfTheCenturyASelectiveHistoryOfInfamy = {
  id: "019db533-f3a0-7145-b1a6-ad2a6f4d5696",
  type: "page-type/great-course",
  slug: "crimes-of-the-century-a-selective-history-of-infamy",
  title: "Crimes of the Century: A Selective History of Infamy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 333.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "crimes-of-the-century-a-selective-history-of-infamy",
      externalLink:
        "https://www.thegreatcoursesplus.com/crimes-of-the-century-a-selective-history-of-infamy",
    },
  ],
} as const satisfies GreatCourse
