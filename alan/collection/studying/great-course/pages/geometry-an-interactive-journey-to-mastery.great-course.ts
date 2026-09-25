import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const geometryAnInteractiveJourneyToMastery = {
  id: "019db533-f3a0-79f8-aec6-91e76dbb988d",
  type: "page-type/great-course",
  slug: "geometry-an-interactive-journey-to-mastery",
  title: "Geometry: An Interactive Journey to Mastery",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1098.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "geometry-an-interactive-journey-to-mastery",
      externalLink:
        "https://www.thegreatcoursesplus.com/geometry-an-interactive-journey-to-mastery",
    },
  ],
} as const satisfies GreatCourse
