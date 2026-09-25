import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMindsOfTheEasternIntellectualTradition = {
  id: "019db533-f39e-7c80-b97e-3a65361f5984",
  type: "page-type/great-course",
  slug: "great-minds-of-the-eastern-intellectual-tradition",
  title: "Great Minds of the Eastern Intellectual Tradition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1120.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-minds-of-the-eastern-intellectual-tradition",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-minds-of-the-eastern-intellectual-tradition",
    },
  ],
} as const satisfies GreatCourse
