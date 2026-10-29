import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS24e06 = {
  id: "01a1884b-ef86-7cf4-a01e-48dc3de8a70c",
  type: "page-type/episode",
  slug: "ncis-s24e06",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-24"],
  position: 6,
  publishedAt: "2026-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7936447",
      externalLink: "https://www.themoviedb.org/tv/4614/season/24/episode/6",
    },
  ],
  title: "Ride or Die",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
