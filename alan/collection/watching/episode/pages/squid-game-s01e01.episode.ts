import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const squidGameS01e01 = {
  id: "01a18852-3db8-7f29-aba8-d742d3886369",
  type: "page-type/episode",
  slug: "squid-game-s01e01",
  description:
    "Hoping to win easy money, a broke and desperate Gi-hun agrees to take part in an enigmatic game. Not long into the first round, unforeseen horrors unfold.",
  ownLength: 61,
  ownProgress: 0,
  partOfCollections: ["season/squid-game-season-1"],
  position: 1,
  publishedAt: "2021-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1922715",
      externalLink: "https://www.themoviedb.org/tv/93405/season/1/episode/1",
    },
  ],
  title: "Red Light, Green Light",
  episodeType: "standard",
  stillPath: "/vMFJS9LIUUAmQ1thq4vJ7iHKwRz.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:40:53.560Z",
  updatedAt: "2026-10-29T15:40:53.560Z",
} as const satisfies Episode
