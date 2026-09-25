import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const sensationPerceptionAndTheAgingProcess = {
  id: "019db533-f39e-7d66-823e-6497e25ca74e",
  type: "page-type/great-course",
  slug: "sensation-perception-and-the-aging-process",
  title: "Sensation, Perception, and the Aging Process",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 729.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "sensation-perception-and-the-aging-process",
      externalLink:
        "https://www.thegreatcoursesplus.com/sensation-perception-and-the-aging-process",
    },
  ],
} as const satisfies GreatCourse
