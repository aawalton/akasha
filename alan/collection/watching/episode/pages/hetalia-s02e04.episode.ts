import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e04 = {
  id: "01a183d7-7ce1-766b-82a4-f94a2f97e990",
  type: "page-type/episode",
  slug: "hetalia-s02e04",
  description:
    "After having formed an alliance, England visits Japan's home but finds mysterious creatures that even Japan himself is unable to see or believe in anymore.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 4,
  publishedAt: "2009-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797697",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/4",
    },
  ],
  title: "The Ghost Culture of England and Japan",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
