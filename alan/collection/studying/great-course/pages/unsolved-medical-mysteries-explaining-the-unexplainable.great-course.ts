import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const unsolvedMedicalMysteriesExplainingTheUnexplainable = {
  id: "019db533-f39f-7109-8bd2-e34c0f0ca919",
  type: "page-type/great-course",
  slug: "unsolved-medical-mysteries-explaining-the-unexplainable",
  title: "Unsolved Medical Mysteries: Explaining the Unexplainable",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 355.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "unsolved-medical-mysteries-explaining-the-unexplainable",
      externalLink:
        "https://www.thegreatcoursesplus.com/unsolved-medical-mysteries-explaining-the-unexplainable",
    },
  ],
} as const satisfies GreatCourse
