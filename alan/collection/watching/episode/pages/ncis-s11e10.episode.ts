import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e10 = {
  id: "01a1884b-ef71-793b-9947-8a2bcbb70ca6",
  type: "page-type/episode",
  slug: "ncis-s11e10",
  description:
    "Complications arise when the NCIS team discovers a link between a murder victim and the current boyfriend of Gibbs and Agent Fornell’s ex-wife.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 10,
  publishedAt: "2013-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968789",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/10",
    },
  ],
  title: "Devil’s Triad",
  episodeType: "standard",
  stillPath: "/8fCWXuPqjaVu2Ibx6jgB3K3j3Iz.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
