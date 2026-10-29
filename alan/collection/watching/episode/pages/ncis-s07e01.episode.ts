import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e01 = {
  id: "01a1884b-ef69-743f-9f8f-b68c05cf934c",
  type: "page-type/episode",
  slug: "ncis-s07e01",
  description:
    "As the hunt for Ziva's replacement begins, Gibbs and his remaining team members must head back to work with the past still weighing heavily on their minds.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 1,
  publishedAt: "2009-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334543",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/1",
    },
  ],
  title: "Truth or Consequences",
  episodeType: "standard",
  stillPath: "/yOH4k62ui8sIfpUWkGRUwZwQh06.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
