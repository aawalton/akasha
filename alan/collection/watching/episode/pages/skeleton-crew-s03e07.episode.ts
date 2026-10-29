import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e07 = {
  id: "01a18852-196b-7c23-bb62-f3d29194d4c2",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e07",
  description:
    "Anglicus decides to throw a surprise birthday party for Drake, whose never had one before, while Appolina has a surprise of her own when her mother visits.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 7,
  publishedAt: "2018-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380496",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/7",
    },
  ],
  title: "Mother Knows Best",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
