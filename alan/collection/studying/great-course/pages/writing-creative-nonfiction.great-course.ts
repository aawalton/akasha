import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const writingCreativeNonfiction = {
  id: "019db533-f39e-7626-98a9-970309b503a5",
  type: "page-type/great-course",
  slug: "writing-creative-nonfiction",
  title: "Writing Creative Nonfiction",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 736.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "writing-creative-nonfiction",
      externalLink: "https://www.thegreatcoursesplus.com/writing-creative-nonfiction",
    },
  ],
} as const satisfies GreatCourse
