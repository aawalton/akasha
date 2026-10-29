import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e23 = {
  id: "01a1884b-ef64-7f86-9a24-fa5c52e82cd3",
  type: "page-type/episode",
  slug: "ncis-s02e23",
  description:
    "A group of serial terrorists seek revenge and send Ari on an assignment to kill Gibbs. The NCIS team go on a hunt after him, but when they discover that Ari has a bigger plan, it is already too late.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 23,
  publishedAt: "2005-05-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334518",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/23",
    },
  ],
  title: "Twilight",
  episodeType: "finale",
  stillPath: "/bWwesh80czKzQaKulIP3CUcy5RT.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
