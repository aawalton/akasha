import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const worldHeritageSitesExploringTheWorldSGreatestPlaces = {
  id: "019db533-f39f-7347-8505-8a5709b8632a",
  type: "page-type/great-course",
  slug: "world-heritage-sites-exploring-the-world-s-greatest-places",
  title: "World Heritage Sites: Exploring the World’s Greatest Places",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 714.6,
  ownProgress: 714.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "world-heritage-sites-exploring-the-world-s-greatest-places",
      externalLink:
        "https://www.thegreatcoursesplus.com/world-heritage-sites-exploring-the-world-s-greatest-places",
    },
  ],
} as const satisfies GreatCourse
