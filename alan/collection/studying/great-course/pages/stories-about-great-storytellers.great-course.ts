import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const storiesAboutGreatStorytellers = {
  id: "019db533-f39e-785d-b256-61f5499f59ea",
  type: "page-type/great-course",
  slug: "stories-about-great-storytellers",
  title: "Stories about Great Storytellers",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "stories-about-great-storytellers",
      externalLink: "https://www.thegreatcoursesplus.com/stories-about-great-storytellers",
    },
  ],
} as const satisfies GreatCourse
