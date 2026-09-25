import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mathematicsDescribingTheRealWorldPrecalculusAndTrigonometry = {
  id: "019db533-f3a0-7850-ac00-187e20f16a99",
  type: "page-type/great-course",
  slug: "mathematics-describing-the-real-world-precalculus-and-trigonometry",
  title: "Mathematics Describing the Real World: Precalculus and Trigonometry",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1122,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mathematics-describing-the-real-world-precalculus-and-trigonometry",
      externalLink:
        "https://www.thegreatcoursesplus.com/mathematics-describing-the-real-world-precalculus-and-trigonometry",
    },
  ],
} as const satisfies GreatCourse
