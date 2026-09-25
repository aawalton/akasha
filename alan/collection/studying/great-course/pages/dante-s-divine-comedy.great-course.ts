import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const danteSDivineComedy = {
  id: "019db533-f39e-79bd-8a93-288adcdf5817",
  type: "page-type/great-course",
  slug: "dante-s-divine-comedy",
  title: "Dante's Divine Comedy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "dantes-divine-comedy",
      externalLink: "https://www.thegreatcoursesplus.com/dantes-divine-comedy",
    },
  ],
} as const satisfies GreatCourse
