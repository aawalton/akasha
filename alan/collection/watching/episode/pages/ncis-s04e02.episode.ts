import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e02 = {
  id: "01a1884b-ef66-7c56-bb6b-d08c96f6ecd9",
  type: "page-type/episode",
  slug: "ncis-s04e02",
  description:
    "Gibbs is forced to come back out of his retirement to help Fornell, who is being threatened by a convict that escaped from prison. Gibbs and the NCIS team re-open the convict's old robbery case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 2,
  publishedAt: "2006-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334474",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/2",
    },
  ],
  title: "Escaped",
  episodeType: "standard",
  stillPath: "/x3MDcBHdslOryIcfKWDyBzXV4oK.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
