import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const metropolisExaminedGermanExpressionismInFilm = {
  id: "019db533-f39e-7fd2-be62-6446963a3bf9",
  type: "page-type/great-course",
  slug: "metropolis-examined-german-expressionism-in-film",
  title: "Metropolis Examined: German Expressionism in Film",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 7.2,
  ownProgress: 7.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "metropolis-examined-german-expressionism-in-film",
      externalLink:
        "https://www.thegreatcoursesplus.com/metropolis-examined-german-expressionism-in-film",
    },
  ],
} as const satisfies GreatCourse
