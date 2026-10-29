import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e12 = {
  id: "01a18843-d150-7b54-ba22-75c11a31d9f6",
  type: "page-type/episode",
  slug: "bluey-s02e12",
  description:
    "Mum must get Bluey and Bingo out the door in time for a playdate, but they can't leave before they finish their game - waiting for a sticky rubber gecko to drop from the ceiling.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 12,
  publishedAt: "2020-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2170397",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/12",
    },
  ],
  title: "Sticky Gecko",
  episodeType: "standard",
  stillPath: "/k0LIfTKVy0Nt9Z2xR6NywtRadN7.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
