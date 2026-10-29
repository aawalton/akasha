import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS05e01 = {
  id: "01a18852-f34c-7b3d-9f30-9907a44dfe4f",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s05e01",
  description: "A spatial anomaly forces the Cerritos crew to face their own faces. Tendi pirates.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-5"],
  position: 1,
  publishedAt: "2024-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5501431",
      externalLink: "https://www.themoviedb.org/tv/85948/season/5/episode/1",
    },
  ],
  title: "Dos Cerritos",
  episodeType: "standard",
  stillPath: "/lHkzQhGr3puKjk7MjRyLxSix29B.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
