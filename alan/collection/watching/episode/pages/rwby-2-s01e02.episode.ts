import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rwby2S01e02 = {
  id: "01a18884-8767-7132-bd5b-6dc4bb791b4e",
  type: "page-type/episode",
  slug: "rwby-2-s01e02",
  description:
    "The airship carrying the new students arrives at Beacon Academy and Ruby faces the daunting prospect of having to meet new people and make new friends.",
  ownLength: 6,
  ownProgress: 6,
  partOfCollections: ["season/rwby-volume-1"],
  position: 2,
  publishedAt: "2013-07-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "918553",
      externalLink: "https://www.themoviedb.org/tv/50137/season/1/episode/2",
    },
  ],
  title: "The Shining Beacon (1)",
  episodeType: "standard",
  stillPath: "/hiEeN08SGRDyKuAy765KvyW1nTW.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T16:35:49.223Z",
  updatedAt: "2026-10-29T16:35:49.223Z",
} as const satisfies Episode
