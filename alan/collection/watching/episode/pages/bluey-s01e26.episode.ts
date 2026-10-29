import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e26 = {
  id: "01a18843-d14e-7797-856f-7b71be5991ac",
  type: "page-type/episode",
  slug: "bluey-s01e26",
  description:
    "As Mum goes for a walk along the beach, Bluey runs to catch up with her. Along the way, she has a series of encounters that both excite and test her in her first solo adventure.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 26,
  publishedAt: "2018-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1601152",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/26",
    },
  ],
  title: "The Beach",
  episodeType: "standard",
  stillPath: "/lRaV9XdB8bZlkWAVvE7KycwTtCW.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
