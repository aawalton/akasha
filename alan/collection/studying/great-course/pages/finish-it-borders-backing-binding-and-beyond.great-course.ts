import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const finishItBordersBackingBindingAndBeyond = {
  id: "019db533-f39e-776c-9d28-d9a503cbb1f2",
  type: "page-type/great-course",
  slug: "finish-it-borders-backing-binding-and-beyond",
  title: "Finish It! Borders, Backing, Binding & Beyond",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 171.6,
  ownProgress: 171.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "finish-it-borders-backing-binding-beyond",
      externalLink: "https://www.thegreatcoursesplus.com/finish-it-borders-backing-binding-beyond",
    },
  ],
} as const satisfies GreatCourse
