import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const introductionToCognitiveScience = {
  id: "019db533-f39f-7293-8b3f-519d3aabb66c",
  type: "page-type/great-course",
  slug: "introduction-to-cognitive-science",
  title: "Introduction to Cognitive Science",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 783,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "introduction-to-cognitive-science",
      externalLink: "https://plus.thegreatcourses.com/introduction-to-cognitive-science",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
