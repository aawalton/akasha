import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mrLincolnTheLifeOfAbrahamLincoln = {
  id: "019db533-f39f-7dae-9081-e036c89bb2a2",
  type: "page-type/great-course",
  slug: "mr-lincoln-the-life-of-abraham-lincoln",
  title: "Mr. Lincoln: The Life of Abraham Lincoln",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 366.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mr-lincoln-the-life-of-abraham-lincoln",
      externalLink: "https://www.thegreatcoursesplus.com/mr-lincoln-the-life-of-abraham-lincoln",
    },
  ],
} as const satisfies GreatCourse
