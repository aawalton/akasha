import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToStayFitAsYouAge = {
  id: "019db533-f3a0-78ba-bde6-66ea57e946ab",
  type: "page-type/great-course",
  slug: "how-to-stay-fit-as-you-age",
  title: "How to Stay Fit As You Age",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 561.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-stay-fit-as-you-age",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-stay-fit-as-you-age",
    },
  ],
} as const satisfies GreatCourse
