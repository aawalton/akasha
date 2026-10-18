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
      externalLink: "https://plus.thegreatcourses.com/writing-creative-nonfiction",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
