import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sailorMoonSeason5 = {
  id: "01a183d8-489c-707a-bebb-fb5005e5cc40",
  type: "page-type/season",
  slug: "sailor-moon-season-5",
  description:
    "Sailor Moon and the Sailor Guardians are about to face their greatest challenge yet—high school! But as the girls take their next big step in life, a mysterious force frees the evil Queen Nehalennia! Who could be behind this new wave of evil? And why are the Sailor Star Lights so resistant to working with Sailor Moon?",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/sailor-moon"],
  position: 5,
  publishedAt: "1996-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60119",
      externalLink: "https://www.themoviedb.org/tv/3570/season/5",
    },
  ],
  title: "Sailor Stars",
  posterPath: "/AbtWy0EXsQhFMyX2kdbl7hD1jXg.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Season
