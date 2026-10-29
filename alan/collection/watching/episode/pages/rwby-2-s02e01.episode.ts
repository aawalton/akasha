import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rwby2S02e01 = {
  id: "01a18884-8768-7651-be36-d438088f3580",
  type: "page-type/episode",
  slug: "rwby-2-s02e01",
  description:
    "The first episode of the new volume kicks off with a splash as Teams RWBY and JNPR take over the hall for a food fight.",
  ownLength: 15,
  ownProgress: 15,
  partOfCollections: ["season/rwby-volume-2"],
  position: 1,
  publishedAt: "2014-07-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1004260",
      externalLink: "https://www.themoviedb.org/tv/50137/season/2/episode/1",
    },
  ],
  title: "Best Day Ever",
  episodeType: "standard",
  stillPath: "/3NZZU4G5LSuO7Z3fZq3D9C8ZP0B.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T16:35:49.223Z",
  updatedAt: "2026-10-29T16:35:49.223Z",
} as const satisfies Episode
