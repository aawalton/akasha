import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const confuciusBuddhaJesusAndMuhammad = {
  id: "019db533-f39e-7b01-a400-5a467c3d47a8",
  type: "page-type/great-course",
  slug: "confucius-buddha-jesus-and-muhammad",
  title: "Confucius, Buddha, Jesus, and Muhammad",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1140.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "confucius-buddha-jesus-and-muhammad",
      externalLink: "https://www.thegreatcoursesplus.com/confucius-buddha-jesus-and-muhammad",
    },
  ],
} as const satisfies GreatCourse
