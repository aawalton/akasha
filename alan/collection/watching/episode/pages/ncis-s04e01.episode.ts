import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e01 = {
  id: "01a1884b-ef66-7d1a-89ff-967904b607c9",
  type: "page-type/episode",
  slug: "ncis-s04e01",
  description:
    "When Ziva is framed for a political assassination, she must avoid the FBI and deal with the consequences without Gibbs' help, who is now enjoying his retirement.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 1,
  publishedAt: "2006-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334473",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/1",
    },
  ],
  title: "Shalom",
  episodeType: "standard",
  stillPath: "/7MzU7xJSLHy2IKRKbyFO32ug5RG.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
