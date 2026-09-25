import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const reporting911AndWhyItStillMatters = {
  id: "019db533-f3a0-7117-8ac1-62d92ec2592c",
  type: "page-type/great-course",
  slug: "reporting-9-11-and-why-it-still-matters",
  title: "Reporting 9/11 and Why It Still Matters",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 121.2,
  ownProgress: 121.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "reporting-9-11-and-why-it-still-matters",
      externalLink: "https://www.thegreatcoursesplus.com/reporting-9-11-and-why-it-still-matters",
    },
  ],
} as const satisfies GreatCourse
