import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howColorsAffectYouWhatScienceReveals = {
  id: "019db533-f39f-766a-a4ab-53c4e688de50",
  type: "page-type/great-course",
  slug: "how-colors-affect-you-what-science-reveals",
  title: "How Colors Affect You: What Science Reveals",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 201,
  ownProgress: 201,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-colors-affect-you-what-science-reveals",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-colors-affect-you-what-science-reveals",
    },
  ],
} as const satisfies GreatCourse
