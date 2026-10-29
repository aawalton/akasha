import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e13 = {
  id: "01a18844-d7f7-7914-9878-a32b38370382",
  type: "page-type/episode",
  slug: "criminal-minds-s13e13",
  description:
    "The BAU is called to investigate a series of D.C. homicides where cryptic messages are found inside the mouths of each victim.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 13,
  publishedAt: "2018-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1390864",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/13",
    },
  ],
  title: "Cure",
  episodeType: "standard",
  stillPath: "/uGqgKAtAwfqbJvZciTd7MeYHUME.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
