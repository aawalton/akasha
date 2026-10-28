import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const noragamiS01e01 = {
  id: "01a183d5-93f1-7d0b-8628-09610ce0b58a",
  type: "page-type/episode",
  slug: "noragami-s01e01",
  description:
    "Yato is an unemployed stray god who battles Phantoms and solves humans' problems for only 5 yen. But little does he know that a search for a missing cat is about to lead to a fateful encounter...",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/noragami-season-1"],
  position: 1,
  publishedAt: "2014-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1148089",
      externalLink: "https://www.themoviedb.org/tv/64710/season/1/episode/1",
    },
  ],
  title: "A Housecat, a Stray God, and a Tail",
  episodeType: "standard",
  stillPath: "/6fpGewGVeiKSbtB1DYJnIIY8sXo.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:46:14.769Z",
  updatedAt: "2026-10-28T18:46:14.769Z",
} as const satisfies Episode
