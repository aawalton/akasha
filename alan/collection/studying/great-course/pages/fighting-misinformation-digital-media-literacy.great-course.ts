import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fightingMisinformationDigitalMediaLiteracy = {
  id: "019db533-f39e-749a-a215-a85b34ea485f",
  type: "page-type/great-course",
  slug: "fighting-misinformation-digital-media-literacy",
  title: "Fighting Misinformation: Digital Media Literacy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 214.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "fighting-misinformation-digital-media-literacy",
      externalLink:
        "https://www.thegreatcoursesplus.com/fighting-misinformation-digital-media-literacy",
    },
  ],
} as const satisfies GreatCourse
