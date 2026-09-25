import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMayoClinicDietTheHealthyApproachToWeightLoss = {
  id: "019db533-f3a0-76de-8680-5b874b12129a",
  type: "page-type/great-course",
  slug: "the-mayo-clinic-diet-the-healthy-approach-to-weight-loss",
  title: "The Mayo Clinic Diet: The Healthy Approach to Weight Loss.",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 400.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-mayo-clinic-diet-the-healthy-approach-to-weight-loss",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-mayo-clinic-diet-the-healthy-approach-to-weight-loss",
    },
  ],
} as const satisfies GreatCourse
