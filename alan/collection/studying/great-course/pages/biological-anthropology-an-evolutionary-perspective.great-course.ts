import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const biologicalAnthropologyAnEvolutionaryPerspective = {
  id: "019db533-f39e-7d0e-967f-38964db5e266",
  type: "page-type/great-course",
  slug: "biological-anthropology-an-evolutionary-perspective",
  title: "Biological Anthropology: An Evolutionary Perspective",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 726,
  ownProgress: 60.5,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "biological-anthropology-an-evolutionary-perspective",
      externalLink:
        "https://www.thegreatcoursesplus.com/biological-anthropology-an-evolutionary-perspective",
    },
  ],
} as const satisfies GreatCourse
