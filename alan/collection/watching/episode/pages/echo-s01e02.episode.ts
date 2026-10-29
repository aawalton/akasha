import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const echoS01e02 = {
  id: "01a18848-0cdb-7f01-b58f-9c94db2e7018",
  type: "page-type/episode",
  slug: "echo-s01e02",
  description:
    "Maya enlists the help of her disapproving family to take down Fisk's army. Meanwhile, she begins experiencing strange visions.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/echo-miniseries"],
  position: 2,
  publishedAt: "2024-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4889377",
      externalLink: "https://www.themoviedb.org/tv/122226/season/1/episode/2",
    },
  ],
  title: "Lowak",
  episodeType: "standard",
  stillPath: "/j33mLOqagobNEl3pe1OPvwuwV76.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:29:45.691Z",
  updatedAt: "2026-10-29T15:29:45.691Z",
} as const satisfies Episode
