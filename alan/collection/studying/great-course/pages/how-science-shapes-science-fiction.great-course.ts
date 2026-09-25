import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howScienceShapesScienceFiction = {
  id: "019db533-f39f-731d-bc9d-9f10edd056ba",
  type: "page-type/great-course",
  slug: "how-science-shapes-science-fiction",
  title: "How Science Shapes Science Fiction",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 706.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-science-shapes-science-fiction",
      externalLink: "https://www.thegreatcoursesplus.com/how-science-shapes-science-fiction",
    },
  ],
} as const satisfies GreatCourse
