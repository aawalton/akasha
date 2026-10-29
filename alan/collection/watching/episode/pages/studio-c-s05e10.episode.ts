import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS05e10 = {
  id: "01a18885-00fb-75ab-8234-26d2e4b15b9d",
  type: "page-type/episode",
  slug: "studio-c-s05e10",
  description:
    "Santa gives Mrs. Claus his best present yet, and the elves unionize for a fair working environment.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-5"],
  position: 10,
  publishedAt: "2014-12-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5574680",
      externalLink: "https://www.themoviedb.org/tv/68207/season/5/episode/10",
    },
  ],
  title: "Season 5 Christmas Special",
  episodeType: "standard",
  stillPath: "/gxd8Dk9SXEvP6DX6kZZMHiOBklR.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
