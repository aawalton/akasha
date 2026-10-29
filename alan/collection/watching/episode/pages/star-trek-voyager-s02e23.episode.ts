import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e23 = {
  id: "01a18853-ac8b-7e84-a256-b533cf662b02",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e23",
  description:
    "Stardate: Unknown. The crew of Voyager encounters a planet that has recently entered an ice age. They discover a series of stasis chambers where a small group of people are mentally connected to an artificial environment that turned horribly wrong.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 23,
  publishedAt: "1996-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113062",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/23",
    },
  ],
  title: "The Thaw",
  episodeType: "standard",
  stillPath: "/3J5uXXLEFysvHtT35Oq4C4DUcbK.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
