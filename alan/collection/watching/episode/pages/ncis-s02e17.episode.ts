import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e17 = {
  id: "01a1884b-ef64-7f71-aa4a-70b1271f71ab",
  type: "page-type/episode",
  slug: "ncis-s02e17",
  description:
    "When a sailor officer receives a pair of blue eyeballs, the NCIS team start investigating the case. Gibbs traces an ex-Navy agent that does illegal work.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 17,
  publishedAt: "2005-03-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334512",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/17",
    },
  ],
  title: "An Eye for an Eye",
  episodeType: "standard",
  stillPath: "/oUbSj4HxGZF0KptgrvJ6jBYphOa.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
