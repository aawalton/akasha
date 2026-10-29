import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e01 = {
  id: "01a1884b-ef68-7989-987d-6f963843daea",
  type: "page-type/episode",
  slug: "ncis-s06e01",
  description:
    "When a Petty Officer is found murdered, Gibbs learns about the mysterious connection between the disbanding of his team and the case.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 1,
  publishedAt: "2008-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334406",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/1",
    },
  ],
  title: "Last Man Standing",
  episodeType: "standard",
  stillPath: "/kOwJQ0nRS3Tv92iYjPgQiu2fRTS.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
