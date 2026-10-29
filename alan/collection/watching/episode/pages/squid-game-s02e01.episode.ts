import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const squidGameS02e01 = {
  id: "01a18852-3db9-7b16-9637-5b6b6b311c78",
  type: "page-type/episode",
  slug: "squid-game-s02e01",
  description:
    "A vengeful Gi-hun makes a U-turn at the airport. Later, in his hideout, he intensifies his search for the elusive recruiter who is seeking new players.",
  ownLength: 66,
  ownProgress: 0,
  partOfCollections: ["season/squid-game-season-2"],
  position: 1,
  publishedAt: "2024-12-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5475279",
      externalLink: "https://www.themoviedb.org/tv/93405/season/2/episode/1",
    },
  ],
  title: "Bread and Lottery",
  episodeType: "standard",
  stillPath: "/tWwP30pufZhWDSxN4qxER7gMbLR.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:40:53.560Z",
  updatedAt: "2026-10-29T15:40:53.560Z",
} as const satisfies Episode
