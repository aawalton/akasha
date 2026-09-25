import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const changingBodyCompositionThroughDietAndExercise = {
  id: "019db533-f3a0-794e-9d67-1cd4e99c34c1",
  type: "page-type/great-course",
  slug: "changing-body-composition-through-diet-and-exercise",
  title: "Changing Body Composition through Diet and Exercise",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 775.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "changing-body-composition-through-diet-and-exercise",
      externalLink:
        "https://www.thegreatcoursesplus.com/changing-body-composition-through-diet-and-exercise",
    },
  ],
} as const satisfies GreatCourse
