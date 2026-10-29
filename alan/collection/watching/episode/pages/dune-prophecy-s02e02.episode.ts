import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const duneProphecyS02e02 = {
  id: "01a18848-0146-7fdb-9ead-c5de36e19218",
  type: "page-type/episode",
  slug: "dune-prophecy-s02e02",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/dune-prophecy-season-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6951098",
      externalLink: "https://www.themoviedb.org/tv/90228/season/2/episode/2",
    },
  ],
  title: "Episode 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:29:42.725Z",
  updatedAt: "2026-10-29T15:29:42.725Z",
} as const satisfies Episode
