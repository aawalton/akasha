import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e01 = {
  id: "01a1884b-ef6d-7051-b22d-461e2c0add42",
  type: "page-type/episode",
  slug: "ncis-s09e01",
  description:
    "Gibbs and the NCIS team have to find answers regarding Tony's months-long assignment when an NCIS agent is found dead.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 1,
  publishedAt: "2011-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334592",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/1",
    },
  ],
  title: "Nature of the Beast",
  episodeType: "standard",
  stillPath: "/vQdPHoxGj4UXD3yDrmrNQ9sCTQf.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
