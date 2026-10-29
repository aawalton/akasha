import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e01 = {
  id: "01a18848-3732-7c07-86a9-93b3f5fff57d",
  type: "page-type/episode",
  slug: "eureka-s03e01",
  description:
    "The search is on for an escaped drone as Eva Thorne arrives to assist the cleanup of damages which Global Dynamics has caused.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 1,
  publishedAt: "2008-07-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335253",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/1",
    },
  ],
  title: "Bad to the Drone",
  episodeType: "standard",
  stillPath: "/6A0X6CWdurNhxscOku265OtKNgE.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
