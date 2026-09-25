import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howDigitalTechnologyShapesUs = {
  id: "019db533-f39f-725f-9ad6-bd1b41716a53",
  type: "page-type/great-course",
  slug: "how-digital-technology-shapes-us",
  title: "How Digital Technology Shapes Us",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 643.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-digital-technology-shapes-us",
      externalLink: "https://www.thegreatcoursesplus.com/how-digital-technology-shapes-us",
    },
  ],
} as const satisfies GreatCourse
