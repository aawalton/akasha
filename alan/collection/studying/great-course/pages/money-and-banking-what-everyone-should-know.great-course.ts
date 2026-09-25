import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const moneyAndBankingWhatEveryoneShouldKnow = {
  id: "019db533-f3a0-7343-b130-fd5091c68ca1",
  type: "page-type/great-course",
  slug: "money-and-banking-what-everyone-should-know",
  title: "Money and Banking: What Everyone Should Know",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1091.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "money-and-banking-what-everyone-should-know",
      externalLink:
        "https://www.thegreatcoursesplus.com/money-and-banking-what-everyone-should-know",
    },
  ],
} as const satisfies GreatCourse
