import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e14 = {
  id: "01a18843-d154-7b2e-9f6e-1f691e8088e1",
  type: "page-type/episode",
  slug: "bluey-s03e14",
  description:
    "Lucky's Dad is outraged that modern Pass the Parcel has a present in every layer and changes the rules back to only having one prize in the middle, but Bingo is forever losing.",
  ownLength: 8,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 14,
  publishedAt: "2021-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3366777",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/14",
    },
  ],
  title: "Pass the Parcel",
  episodeType: "standard",
  stillPath: "/fFXQIMNvRqiRyFl9YRXG2YNkKMq.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
