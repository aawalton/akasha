import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e07 = {
  id: "01a18853-ddfd-716f-bfb8-adfed609d13a",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e07",
  description:
    "A new Imperial ship captures Ezra, Commander Sato, and his crew, forcing Kanan and the clone to go undercover as stormtroopers to free the rebels.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 7,
  publishedAt: "2015-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1135848",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/7",
    },
  ],
  title: "Stealth Strike",
  episodeType: "standard",
  stillPath: "/lNsf1raBWms1qMMSWBnoFU6mBDh.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
