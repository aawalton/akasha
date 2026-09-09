import type { GreatCourse } from "../../great-course.page-type.ts"

export const introductionToCognitiveScience = {
  id: "019db533-f39f-7293-8b3f-519d3aabb66c",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "introduction-to-cognitive-science",
  title: "Introduction to Cognitive Science",
  status: "not-started",
  unit: "minutes",
  ownLength: 783,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "introduction-to-cognitive-science",
  externalLink: "https://www.thegreatcoursesplus.com/introduction-to-cognitive-science",
} as const satisfies GreatCourse
