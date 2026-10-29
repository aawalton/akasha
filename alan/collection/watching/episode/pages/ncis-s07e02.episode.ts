import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e02 = {
  id: "01a1884b-ef6a-7bce-8ca6-ba5e5a1f6f7a",
  type: "page-type/episode",
  slug: "ncis-s07e02",
  description:
    "The team discovers the bizarre death of a Marine and his two friends may be linked to their past, but it's Gibbs who ends up taking a trip down memory lane.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 2,
  publishedAt: "2009-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334544",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/2",
    },
  ],
  title: "Reunion",
  episodeType: "standard",
  stillPath: "/lApQT6lQEkFzY2ez6vzsG1TQzwt.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
