import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e23 = {
  id: "01a183d7-7ce1-7108-9a99-2e9cf82e7361",
  type: "page-type/episode",
  slug: "hetalia-s02e23",
  description:
    "Adapts from Japan And The Footsteps Of Westernization, along with a segment from Fly, Canada-san, Fly!.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 23,
  publishedAt: "2009-12-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797716",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/23",
    },
  ],
  title: "Japan Westernizes and Canada Flies",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
