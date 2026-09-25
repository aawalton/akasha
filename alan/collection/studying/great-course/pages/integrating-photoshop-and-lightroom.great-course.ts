import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const integratingPhotoshopAndLightroom = {
  id: "019db533-f39e-72c7-8e2f-50e4c1316637",
  type: "page-type/great-course",
  slug: "integrating-photoshop-and-lightroom",
  title: "Integrating Photoshop and Lightroom",
  status: "archived",
  unit: "unit/minutes",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "integrating-photoshop-and-lightroom",
      externalLink: "https://www.thegreatcoursesplus.com/integrating-photoshop-and-lightroom",
    },
  ],
} as const satisfies GreatCourse
