import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const blackCapitalAfricanAmericansInWashingtonDC = {
  id: "019db533-f39f-7ef6-8655-d1c5ada0843f",
  type: "page-type/great-course",
  slug: "black-capital-african-americans-in-washington-d-c",
  title: "Black Capital: African Americans in Washington, D.C.",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 54,
  ownProgress: 54,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "black-capital-african-americans-in-washington-dc",
      externalLink:
        "https://www.thegreatcoursesplus.com/black-capital-african-americans-in-washington-dc",
    },
  ],
} as const satisfies GreatCourse
