import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS01e03 = {
  id: "01a18843-982a-7eb0-8a00-aaf59bb02321",
  type: "page-type/episode",
  slug: "black-mirror-s01e03",
  description:
    "In the near future, everyone has access to a memory implant that records everything humans do, see and hear.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-1"],
  position: 3,
  publishedAt: "2011-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877837",
      externalLink: "https://www.themoviedb.org/tv/42009/season/1/episode/3",
    },
  ],
  title: "The Entire History of You",
  episodeType: "finale",
  stillPath: "/4PWu1S4RME6RnGSJUJuuSz19R2G.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
