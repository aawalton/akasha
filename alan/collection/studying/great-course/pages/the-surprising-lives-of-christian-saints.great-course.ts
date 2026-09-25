import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSurprisingLivesOfChristianSaints = {
  id: "019db533-f39e-7b30-884a-e7debebef69f",
  type: "page-type/great-course",
  slug: "the-surprising-lives-of-christian-saints",
  title: "The Surprising Lives of Christian Saints",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 707.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-surprising-lives-of-christian-saints",
      externalLink: "https://www.thegreatcoursesplus.com/the-surprising-lives-of-christian-saints",
    },
  ],
} as const satisfies GreatCourse
