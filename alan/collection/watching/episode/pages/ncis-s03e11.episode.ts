import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e11 = {
  id: "01a1884b-ef65-7c68-9f4e-70fc4e6472d7",
  type: "page-type/episode",
  slug: "ncis-s03e11",
  description:
    "A supermodel dies while filming a reality show on a Marine base, and the NCIS team must discover who is the model's murderer. They discover a love triangle between the model and three other men, all suspects.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 11,
  publishedAt: "2005-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334527",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/11",
    },
  ],
  title: "Model Behavior",
  episodeType: "mid-season",
  stillPath: "/6STMw50xyG9h5OpXonqzEVADMLW.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
