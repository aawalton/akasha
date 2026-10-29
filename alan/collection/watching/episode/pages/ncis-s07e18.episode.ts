import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e18 = {
  id: "01a1884b-ef6b-7312-8786-a9b49998e2cb",
  type: "page-type/episode",
  slug: "ncis-s07e18",
  description:
    "The team discovers striking similarities between themselves and their CGIS (Coast Guard Investigative Services) counterparts when a Navy diver seeking sunken treasure is found dead.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 18,
  publishedAt: "2010-03-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334556",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/18",
    },
  ],
  title: "Jurisdiction",
  episodeType: "standard",
  stillPath: "/AbAsYOp6A12Ua32z0kmbKR3zwUe.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
