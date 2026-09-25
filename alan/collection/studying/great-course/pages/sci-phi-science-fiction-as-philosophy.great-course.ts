import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const sciPhiScienceFictionAsPhilosophy = {
  id: "019db533-f39e-7c1f-ab4d-7cb81fa840e6",
  type: "page-type/great-course",
  slug: "sci-phi-science-fiction-as-philosophy",
  title: "Sci-Phi: Science Fiction as Philosophy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 823.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "sci-phi-science-fiction-as-philosophy",
      externalLink: "https://www.thegreatcoursesplus.com/sci-phi-science-fiction-as-philosophy",
    },
  ],
} as const satisfies GreatCourse
