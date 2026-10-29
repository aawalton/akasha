import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e02 = {
  id: "01a18852-196a-76fe-baa7-272399bc7dfc",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e02",
  description:
    "Anglicus is debuting a new drink at MoneyShot$ called the Baptism, but a series of problems threaten the big premiere.",
  ownLength: 32,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 2,
  publishedAt: "2017-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380472",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/2",
    },
  ],
  title: "Milk and Blood",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
