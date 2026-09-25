import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToCreateComics = {
  id: "019db533-f39e-7708-953a-db8ea0dc09a2",
  type: "page-type/great-course",
  slug: "how-to-create-comics",
  title: "How to Create Comics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 310.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-create-comics",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-create-comics",
    },
  ],
} as const satisfies GreatCourse
