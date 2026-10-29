import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e10 = {
  id: "01a1884b-ef69-74b3-b361-c3546ac2040c",
  type: "page-type/episode",
  slug: "ncis-s06e10",
  description:
    "The team investigates the death of a Petty Officer and discovers he may have been leading a violent secret life.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 10,
  publishedAt: "2008-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334414",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/10",
    },
  ],
  title: "Road Kill",
  episodeType: "standard",
  stillPath: "/7EBa6qY0DxNKxHtG8GGJLb8fMfx.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
