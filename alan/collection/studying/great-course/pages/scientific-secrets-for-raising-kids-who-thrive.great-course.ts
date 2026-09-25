import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const scientificSecretsForRaisingKidsWhoThrive = {
  id: "019db533-f39f-7003-bd79-20d396bf709d",
  type: "page-type/great-course",
  slug: "scientific-secrets-for-raising-kids-who-thrive",
  title: "Scientific Secrets for Raising Kids Who Thrive",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 769.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "scientific-secrets-for-raising-kids-who-thrive",
      externalLink:
        "https://www.thegreatcoursesplus.com/scientific-secrets-for-raising-kids-who-thrive",
    },
  ],
} as const satisfies GreatCourse
