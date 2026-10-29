import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS02e01 = {
  id: "01a18852-f34a-7ee5-a593-6041a7d220cf",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s02e01",
  description:
    'Approximately three months after the events of the season one finale, the U.S.S. Cerritos is dispatched on a mission where it ends up in a sci-fi event resulting in "strange energy," which Commander Ransom inadvertently absorbs.',
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-2"],
  position: 1,
  publishedAt: "2021-08-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2853476",
      externalLink: "https://www.themoviedb.org/tv/85948/season/2/episode/1",
    },
  ],
  title: "Strange Energies",
  episodeType: "standard",
  stillPath: "/zesRgabB6QBLohnQ97tOvIodwAF.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
