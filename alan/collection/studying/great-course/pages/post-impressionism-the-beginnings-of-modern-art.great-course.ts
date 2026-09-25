import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const postImpressionismTheBeginningsOfModernArt = {
  id: "019db533-f39f-7537-a877-64698ad015cd",
  type: "page-type/great-course",
  slug: "post-impressionism-the-beginnings-of-modern-art",
  title: "Post-Impressionism: The Beginnings of Modern Art",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 642.6,
  ownProgress: 642.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "post-impressionism-the-beginnings-of-modern-art",
      externalLink:
        "https://www.thegreatcoursesplus.com/post-impressionism-the-beginnings-of-modern-art",
    },
  ],
} as const satisfies GreatCourse
