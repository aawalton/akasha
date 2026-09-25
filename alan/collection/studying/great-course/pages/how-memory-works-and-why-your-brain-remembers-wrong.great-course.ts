import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howMemoryWorksAndWhyYourBrainRemembersWrong = {
  id: "019db533-f39f-72e8-a344-0011a8b61e1e",
  type: "page-type/great-course",
  slug: "how-memory-works-and-why-your-brain-remembers-wrong",
  title: "How Memory Works and Why Your Brain Remembers Wrong",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 350.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-memory-works-and-why-your-brain-remembers-wrong",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-memory-works-and-why-your-brain-remembers-wrong",
    },
  ],
} as const satisfies GreatCourse
