import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const brainMythsExplodedLessonsFromNeuroscience = {
  id: "019db533-f39f-708a-b0e5-8a6d4badbb8a",
  type: "page-type/great-course",
  slug: "brain-myths-exploded-lessons-from-neuroscience",
  title: "Brain Myths Exploded: Lessons from Neuroscience",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 723,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "brain-myths-exploded-lessons-from-neuroscience",
      externalLink:
        "https://www.thegreatcoursesplus.com/brain-myths-exploded-lessons-from-neuroscience",
    },
  ],
} as const satisfies GreatCourse
