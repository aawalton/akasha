import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e10 = {
  id: "01a18852-196a-7292-85db-17eb19754635",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e10",
  description:
    "The day of Appolina's wedding has arrived, and all gather at MoneyShot$ to celebrate.",
  ownLength: 39,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 10,
  publishedAt: "2017-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380467",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/10",
    },
  ],
  title: "The Corpse Bride",
  episodeType: "finale",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
