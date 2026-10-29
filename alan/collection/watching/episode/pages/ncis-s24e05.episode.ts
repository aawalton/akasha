import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS24e05 = {
  id: "01a1884b-ef86-79a6-a390-66adc0950dc6",
  type: "page-type/episode",
  slug: "ncis-s24e05",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-24"],
  position: 5,
  publishedAt: "2026-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7936446",
      externalLink: "https://www.themoviedb.org/tv/4614/season/24/episode/5",
    },
  ],
  title: "Speechless",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
