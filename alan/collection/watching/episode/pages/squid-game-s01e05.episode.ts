import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const squidGameS01e05 = {
  id: "01a18852-3db8-7910-a953-228df9cd274e",
  type: "page-type/episode",
  slug: "squid-game-s01e05",
  description:
    "Gi-hun and his team take turns keeping guard through the night. The masked men encounter trouble with their co-conspirators.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/squid-game-season-1"],
  position: 5,
  publishedAt: "2021-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3146771",
      externalLink: "https://www.themoviedb.org/tv/93405/season/1/episode/5",
    },
  ],
  title: "A Fair World",
  episodeType: "standard",
  stillPath: "/2pE9f6drlF7y9rwUw6dh1w6jF5M.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:40:53.560Z",
  updatedAt: "2026-10-29T15:40:53.560Z",
} as const satisfies Episode
